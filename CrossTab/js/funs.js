
var funs = {
    ArrayIndexOf: function (array, findItem) {
        var aLen = array.length;
        for (var i = 0, n = 0; i < aLen; i++) {
            if (array[i] == findItem) return i;
        }
        return -1;
    },

    CreateDom: function (Parent, NewTagName, AllAttr, styleAllAttr) {
        var NewDom = document.createElement(NewTagName);
        this.SetObjAttrs(NewDom, AllAttr);
        this.SetObjAttrs(NewDom.style, styleAllAttr);
        if (Parent)
            Parent.appendChild(NewDom);
        return NewDom;
    },

    SetObjAttrs: function (tObj, AllAttr) {
        if (tObj != null && AllAttr != null) {
            for (var NewAttr in AllAttr) {
                tObj[NewAttr] = AllAttr[NewAttr];
            }
        }
    },

    RemoveAllChild: function (ParentNode) {
        if (ParentNode && ParentNode.hasChildNodes && ParentNode.removeChild) {
            while (ParentNode.hasChildNodes()) {
                ParentNode.removeChild(ParentNode.firstChild);
            }
        }
    },

    GetColumn: function (aDataTable, ColumnName) {
        if (aDataTable) {
            for (var i = 0; i < aDataTable.Columns.length; i++) {
                var aCol = aDataTable.Columns[i];
                if (aCol.ColumnName == ColumnName) return aCol;
            }
        }
        return null;
    },

    GetWinWidth: function () {
        if (typeof (window.innerWidth) == 'number')
            return window.innerWidth; //Non-IE   
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
            return document.documentElement.clientWidth; //IE 6+ in 'standards compliant mode'   
        else if (document.body && (document.body.clientWidth || document.body.clientHeight))
            return document.body.clientWidth; //IE 4 compatible   
        else
            return 0;
    },

    GetWinHeight: function () {
        if (typeof (window.innerWidth) == 'number')
            return window.innerHeight; //Non-IE   
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
            return document.documentElement.clientHeight; //IE 6+ in 'standards compliant mode'   
        else if (document.body && (document.body.clientWidth || document.body.clientHeight))
            return document.body.clientHeight; //IE 4 compatible   
        else
            return 0;
    }

}