function CrossTabSetting(DivTopID, DivLeftID, DivRightID, DivListID, DataTable) {
    //<li class="ui-state-default">Item 1</li>
    var DefCols = ["SalesPersonID"];//Top
    var DefRows = ["OrderYear", "OrderMonth"];//Left
    var DefDatas = ["SubTotal", "TotalDue"]; //Right

    var DivTop = document.getElementById(DivTopID);
    var DivLeft = document.getElementById(DivLeftID);
    var DivRight = document.getElementById(DivRightID);
    var DivList = document.getElementById(DivListID);

    var CreateLayout = function () {
        var AddLI = function (PDiv, CName, aWidth) {
            var NDiv = funs.CreateDom(PDiv, "li", { "className": "ui-state-default" });
            if (aWidth != "") NDiv.style["width"] = aWidth;
            NDiv.innerText = CName;
        }
        for (var c = 0; c < DataTable.Columns.length; c++) {
            var ColumnName = DataTable.Columns[c].ColumnName;
            if (funs.ArrayIndexOf(DefCols, ColumnName) > -1) {
                AddLI(DivTop, ColumnName, "");
            }
            else if (funs.ArrayIndexOf(DefRows, ColumnName) > -1) {
                AddLI(DivLeft, ColumnName, "100%");
            }
            else if (funs.ArrayIndexOf(DefDatas, ColumnName) > -1) {
                AddLI(DivRight, ColumnName, "100%");
            }
            else {
                AddLI(DivList, ColumnName, "100%");
            }
        }
    }

    var InitSortable = function () {
        var iStr = "#" + DivTopID + ", #" + DivLeftID + ", #" + DivRightID + ", #" + DivListID; //"#sortable_top, #sortable_left, #sortable_right, #sortable_list"
        ss = $(iStr).sortable({
            placeholder: "ui-state-highlight",
            connectWith: "ul",
            stop: function (event, ui) {
                var TItem = ui.item[0];
                if (TItem && TItem.parentNode) {
                    if (TItem.parentNode == DivTop) {
                        TItem.style["width"] = "";
                    }
                    else {
                        TItem.style["width"] = "100%";
                    }
                }
            }
        }).disableSelection();
    }

    var GetColumns = function (PDiv) {
        var RetValue = new Array();
        var allLI = PDiv.childNodes;
        for (var i = 0; i < allLI.length; i++) {
            var li = allLI[i];
            RetValue.push(li.innerText);
        }
        return RetValue;
    }

    this.Cols = function () {
        return GetColumns(DivTop);
    }

    this.Rows = function () {
        return GetColumns(DivLeft);
    }

    this.Datas = function () {
        return GetColumns(DivRight);
    }

    CreateLayout();
    InitSortable();
}