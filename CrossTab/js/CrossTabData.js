function CrossTabData() {

    //排序Table.Rows資料
    var SortRows = function (ArrayRows, ArraySortColumns, ArraySortType) {
        if (ArraySortColumns == null || ArraySortColumns.length == 0) return;
        var sortCode = function (a, b) {
            var c = 0;
            while (c < ArraySortColumns.length) {
                var SortColumnName = ArraySortColumns[c];
                var IsASC = ArraySortType == null || ArraySortType[c] == "asc";
                var v1 = a[SortColumnName]; //parseFloat()
                var v2 = b[SortColumnName];
                if (v1 != v2) {
                    if (IsASC)
                        return (v1 > v2) ? 1 : -1; //小排到大
                    else
                        return (v1 > v2) ? -1 : 1; //大排到小
                    break;
                }
                c++;
            }
            return 0; //相等
        };
        var RetValue = ArrayRows.sort(sortCode);
        return RetValue;
    };

    this.RunData = function (DataTable, Cols, Rows, Datas) {
        var CloneColumn = function (ColumnName) {
            var col = funs.GetColumn(DataTable, ColumnName);
            if (col) {
                var RetValue = new Object();
                funs.SetObjAttrs(RetValue, col);
                return RetValue;
            }
            return null;
        }

        var GetRowKey = function (DataRow) {
            var RetValue = "";
            for (var i2 = 0; i2 < Rows.length; i2++) {
                var dstr = DataRow[Rows[i2]];
                if (RetValue != "") RetValue += "|";
                RetValue += dstr;
            }
            return RetValue;
        }

        var GetCTColumnName = function (DataRow, DataColName) {
            var RetValue = "";
            for (var i3 = 0; i3 < Cols.length; i3++) {
                var dstr = DataRow[Cols[i3]];
                if (RetValue != "") RetValue += "|";
                RetValue += dstr;
            }
            var dstr2 = DataColName;
            if (RetValue != "") RetValue += "|";
            RetValue += dstr2;
            return RetValue;
        }

        var SortColumns = Rows.concat(Cols).concat(Datas);
        var TTableRows = SortRows(DataTable.Rows, SortColumns, null);

        var NewColumns = new Array();
        var NewColumnNames = new Array();
        for (var i = 0; i < Rows.length; i++) {
            NewColumnNames.push(Rows[i]);
            var newCol = CloneColumn(Rows[i]);
            newCol["CTColumnName"] = newCol["ColumnName"];
            if (newCol) NewColumns.push(newCol);
        }

        var NewRows = new Array();
        var TRow;
        var Key;
        for (var r = 0; r < TTableRows.length; r++) {
            var aRow = DataTable.Rows[r];
            var RowKey = GetRowKey(aRow);
            if (Key != RowKey) {
                Key = RowKey;
                TRow = new Object();
                NewRows.push(TRow);
                for (var i = 0; i < Rows.length; i++) {
                    TRow[Rows[i]] = aRow[Rows[i]];
                }
            }
            for (var k = 0; k < Datas.length; k++) {
                var dName = Datas[k];
                var CTColumnName = GetCTColumnName(aRow, dName);
                if (funs.ArrayIndexOf(NewColumnNames, CTColumnName) == -1) {
                    NewColumnNames.push(CTColumnName);
                    var NewDataColumn = CloneColumn(dName);
                    NewDataColumn["Caption"] = CTColumnName;
                    NewDataColumn["CTColumnName"] = CTColumnName;
                    NewColumns.push(NewDataColumn);
                }
                if (NewDataColumn["DataType"] == "int" || NewDataColumn["DataType"] == "decimal") {
                    if (TRow[CTColumnName] != null)
                        TRow[CTColumnName] += aRow[dName];
                    else
                        TRow[CTColumnName] = aRow[dName];
                    TRow[CTColumnName] = Math.round(TRow[CTColumnName] * 10000) / 10000; //四捨五入
                }
                else {
                    TRow[CTColumnName] = aRow[dName];
                }
            }

        }
        return { "Columns": NewColumns, "Rows": NewRows };
    };

}
