function DataEditor(PDiv, DataTable) {
    var tbody;
    var Clear = function () {
        funs.RemoveAllChild(PDiv);
    }

    var CreateTable = function () {
        //aTable = funs.CreateDom(PDiv, "table", { "className": "DataGrid_LD_tbl", "cellPadding": "0", "cellSpacing": "0" });
        var aTable = funs.CreateDom(PDiv, "table", { "className": "DEd_tbl" });
        tbody = funs.CreateDom(aTable, "tbody");
        var aHeaderTR = funs.CreateDom(tbody, "tr", { "className": "DEd_HeaderTR" });
        for (var c = 0; c < DataTable.Columns.length; c++) {
            var ColumnName = DataTable.Columns[c].ColumnName;
            var aHeaderTD = funs.CreateDom(aHeaderTR, "td", {});
            aHeaderTD.innerText = ColumnName;
        }

        for (var i = 0; i < DataTable.Rows.length; i++) {
            var DataRow = DataTable.Rows[i];
            CreateTableTR(DataRow);
        }
    }

    var CreateTableTR = function (DataRow) {
        var aTableTR = funs.CreateDom(tbody, "tr", { "className": "DEd_TR" });
        for (var c = 0; c < DataTable.Columns.length; c++) {
            var ColumnName = DataTable.Columns[c].ColumnName;
            var DataTD = funs.CreateDom(aTableTR, "td", {});
            var Edipt = funs.CreateDom(DataTD, "input", { "r": DataRow, "c": c });
            Edipt.value = DataRow[ColumnName];
            $(Edipt).bind("change", function () {
                var tdr = this["r"];
                var tdc = this["c"];
                var tcName = DataTable.Columns[tdc].ColumnName;
                tdr[tcName] = this.value;
            });
        }
    }

    Clear();
    CreateTable();
}