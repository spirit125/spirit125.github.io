
function CreateGrid(CTData, Cols, Rows, Datas, Div1, Div2, Div3, Div4) {
    var tbl1 = null;
    var tbl2 = null;
    var tbl3 = null;
    var tbl4 = null;

    var CrossTabColumns = new Array();
    for (var c = 0; c < CTData.Columns.length; c++) {
        var ctCol = CTData.Columns[c];
        CrossTabColumns.push(ctCol["CTColumnName"]);
    }
    var AddDNRow = Datas.length > 1;
    var HeaderRowCount = AddDNRow ? Cols.length + 1 : Cols.length;

    var CreateLeftTopTable = function () {
        tbl1 = funs.CreateDom(Div1, "table", { "className": "CrossTab_Table" });
        var tbl1_tr = funs.CreateDom(tbl1, "tr", { "className": "CrossTab_TopHeaderTR" });
        for (var c = 0; c < Rows.length; c++) {
            var aHeaderTD = funs.CreateDom(tbl1_tr, "td");
            aHeaderTD.innerText = CrossTabColumns[c];
        }
    }

    var CreateRightTopTable = function () {
        var HdRowCap = new Array();
        for (var r = 0; r < HeaderRowCount; r++) {
            var PreCellValue = null;
            HdRowCap[r] = new Array();
            for (var cn = Rows.length; cn < CrossTabColumns.length; cn++) {
                var CName = CrossTabColumns[cn];
                var CNameArray = CName.split("|");
                if (r == 0) {
                    var HC = CNameArray[0];
                    var HC2 = PreCellValue == HC ? null : HC;
                    HdRowCap[r].push(HC2);
                    PreCellValue = HC;
                }
                else {
                    var HLC = CNameArray[r];
                    var HLC2 = PreCellValue == HLC ? null : HLC;
                    HdRowCap[r].push(HLC2);
                    PreCellValue = HLC;
                }
            }
            PreCellValue = null;
        }

        tbl2 = funs.CreateDom(Div2, "table", { "className": "CrossTab_Table" });
        for (var r = 0; r < HeaderRowCount; r++) {
            var aHeaderTR = funs.CreateDom(tbl2, "tr", { "className": "CrossTab_TopHeaderTR" });
            var HArray = HdRowCap[r];
            for (var cn = 0; cn < CrossTabColumns.length - Rows.length; cn++) {
                if (HArray[cn] != null) {
                    var colspan = 1;
                    var ti = cn + 1;
                    while (ti < HArray.length && HArray[ti] == null) {
                        colspan++;
                        ti++;
                    }

                    var rowspan = 1;
                    ti = r + 1;
                    while (ti < HeaderRowCount && HdRowCap[ti][cn] == null) {
                        rowspan++;
                        ti++;
                    }

                    var aHeaderTD = funs.CreateDom(aHeaderTR, "td", { "colSpan": colspan, "rowSpan": rowspan });
                    aHeaderTD.innerText = HArray[cn];
                }
            }
        }
    }

    var CreateLeftBottomTable = function () {
        tbl3 = funs.CreateDom(Div3, "table", { "className": "CrossTab_Table" });
        var ipt = funs.CreateDom(Div3, "input", {}, { "width": "5px", "visibility": "hidden" });
        var GetRowKey = function (aRow, ColIdx) {
            var RetRowKey = "";
            for (var tc = 0; tc <= ColIdx; tc++) {
                var tcname = CrossTabColumns[tc];
                var aText = aRow[tcname];
                if (RetRowKey != "") RetRowKey += "|";
                RetRowKey += aText;
            }
            return RetRowKey;
        }

        var TempPV = new Object();
        for (var r = 0; r < CTData.Rows.length; r++) {
            var aRow = CTData.Rows[r];
            var tbl3_tr = funs.CreateDom(tbl3, "tr", { "className": "CrossTab_LeftHeaderTR" });
            for (var c = 0; c < Rows.length; c++) {
                var rKey = GetRowKey(aRow, c);
                if (TempPV[c] == null || TempPV[c] != rKey) {
                    var rowspan = 1;
                    var ti = r + 1;
                    while (ti < CTData.Rows.length && GetRowKey(CTData.Rows[ti], c) == rKey) {
                        rowspan++;
                        ti++;
                    }
                    var cname = CrossTabColumns[c];
                    var aText = aRow[cname];
                    var aLTD = funs.CreateDom(tbl3_tr, "td", { "rowSpan": rowspan });
                    aLTD.innerText = aText;
                }
                TempPV[c] = rKey;
            }
        }
    }

    var CreateRightBottomTable = function () {
        tbl4 = funs.CreateDom(Div4, "table", { "className": "CrossTab_Table" });
        for (var r = 0; r < CTData.Rows.length; r++) {
            var aRow = CTData.Rows[r];
            var tbl4_tr = funs.CreateDom(tbl4, "tr", { "className": "CrossTab_DataTR" });
            for (var cn = Rows.length; cn < CrossTabColumns.length; cn++) {
                var cname = CrossTabColumns[cn];
                var aText = aRow[cname];
                if (aText == null) aText = "";
                var aRTD = funs.CreateDom(tbl4_tr, "td");
                aRTD.innerText = aText;
            }
        }
    }

    var FixTDWidth = function (table1, table2) {
        var allRow1 = table1.getElementsByTagName("tr");
        var allRow2 = table2.getElementsByTagName("tr");
        var allTDs1 = allRow1[allRow1.length - 1].getElementsByTagName("td");
        var allTDs2 = allRow2[allRow1.length - 1].getElementsByTagName("td");
        for (var c = 0; c < allTDs1.length; c++) {
            var aLen1 = allTDs1[c].clientWidth;
            var aLen2 = allTDs2[c].clientWidth;
            var aLen = Math.max(aLen1, aLen2);
            allTDs1[c].style["width"] = aLen + "px";
            allTDs2[c].style["width"] = aLen + "px";
        }
    }

    var FixTableHeight = function (table1, table2) {
        var aHeight1 = table1.clientHeight;
        var aHeight2 = table2.clientHeight;
        var aHeight = Math.max(aHeight1, aHeight2);
        table1.style["height"] = aHeight + "px";
        table2.style["height"] = aHeight + "px";
    }

    var FixDivSize = function () {
        var TWidth = funs.GetWinWidth() - 30;
        var THeight = funs.GetWinHeight() - 30;
        var RightWidth = TWidth - Div1.offsetWidth;
        tbl2.style["width"] = tbl2.clientWidth + "px";
        if (RightWidth > 0) {
            Div2.style["width"] = RightWidth + "px";
            Div4.style["width"] = RightWidth + "px";
        }
        var BottomHeight = THeight - Div1.offsetHeight;
        if (BottomHeight > 0) {
            Div3.style["height"] = BottomHeight + "px";
            Div4.style["height"] = BottomHeight + "px";
        }
    }
    this.FixDivSize = FixDivSize;

    var AddScrollEvent = function () {
        Div4.onscroll = function () {
            var aLeft = Div4.scrollLeft;
            var aTop = Div4.scrollTop;
            Div2.scrollLeft = aLeft;
            Div3.scrollTop = aTop;
        }
    }

    CreateLeftTopTable();
    CreateRightTopTable();
    CreateLeftBottomTable();
    CreateRightBottomTable();
    FixTDWidth(tbl1, tbl3);
    FixTDWidth(tbl2, tbl4);
    FixTableHeight(tbl1, tbl2);
    FixDivSize();
    AddScrollEvent();
}
