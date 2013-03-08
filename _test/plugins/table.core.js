/**
 * Created with JetBrains PhpStorm.
 * User: taoqili
 * Date: 13-2-21
 * Time: 下午1:31
 * To change this template use File | Settings | File Templates.
 */
function getTable(str) {
    var div = document.getElementById("testTable");
    if(!div){
        div = document.createElement("div");
        div.id = "testTable";
        document.body.appendChild(div);
    }
    div.innerHTML = "<table border='1'>" + str + "</table>";
    return div.firstChild;
}
UT = UE.UETable;
test("create UETable",function(){
    var table = getTable("<tr><td>ddd</td></tr>"),
        ut = new UT(table);
    ok(ut.table === table,"UT对象创建成功");
    ok(ut.colsNum == 1 && ut.rowsNum == 1,"单元格行、列数为1");
});

test("getMaxRows",function(){
    var table = getTable("<tr><td>1</td><td>2</td><td>3</td></tr>" +
                         "<tr><td>1</td><td>2</td><td>3</td></tr>"),
        ut = new UT(table);
    var maxRows = ut.getMaxRows();
    equal(maxRows,2,"最大行数为2");
    table = getTable("<tr><td rowspan='3'>1</td><td>2</td><td rowspan='2'>3</td></tr>" +
                     "<tr><td>2</td></tr>");
    ut = new UT(table);
    maxRows = ut.getMaxRows();
    equal(maxRows,3,"最大行数为3");
});
test("getMaxCols",function(){
    var table = getTable("<tr><td>1</td><td>2</td><td>3</td></tr>" +
                         "<tr><td>1</td><td>2</td><td>3</td></tr>"),
        ut = new UT(table);
    var maxCols = ut.getMaxCols();
    equal(maxCols,3,"最大列数为3");

    table = getTable("<tr><td rowspan='3'>1</td><td>2</td><td rowspan='2'>3</td></tr>" +
        "<tr><td>2</td><td colspan='3'></td></tr>");
    ut = new UT(table);
    maxCols = ut.getMaxCols();
    equal(maxCols,6,"最大列数为6");
});

test("getSameEndPosCells",function(){
    var table = getTable("<tr><td rowspan='2'>1</td><td>2</td><td>3</td></tr>" +
                         "<tr><td>2</td><td>3</td></tr>"),
        ut = new UT(table);
    var cell = table.rows[0].cells[0],
        cells1 = ut.getSameEndPosCells(cell,"x"),
        cells2 = ut.getSameEndPosCells(cell,"y");
    ok(cells1.length == 1, "获取到同样X轴结尾位置的cell1个");
    ok(cells2.length == 2, "获取到同样Y轴结尾位置的cell2个");
});

test("getHSideCell",function(){
    var table = getTable("<tr><td rowspan='2'>1</td><td>2</td><td>3</td></tr>" +
        "<tr><td>2</td><td>3</td></tr>"),
        ut = new UT(table);
    var rows = table.rows,
        cell = rows[1].cells[1],
        cell1 = ut.getHSideCell(cell),
        cell2 = ut.getHSideCell(cell,true);
    equal(cell1,rows[1].cells[0],"左边单元格");
    equal(cell2,null,"位于右边缘的单元格无右邻居单元格");
    equal(ut.getHSideCell(rows[0][0]),null,"位于左边缘的单元格无左邻居单元格");
});

test("getVSideCell",function(){
    var table = getTable("<tr><td rowspan='2'>1</td><td>2</td><td>3</td></tr>" +
            "<tr><td>2</td><td>3</td></tr>"),
        ut = new UT(table);
    var rows = table.rows,
        cell = rows[1].cells[1],
        cell1 = ut.getVSideCell(cell),
        cell2 = ut.getVSideCell(cell,true),
        cell3 = ut.getVSideCell(cell,true,true);
    equal(cell1,rows[0].cells[2],"上边单元格");
    equal(cell2,null,"位于下边缘的单元格无下邻居单元格");
    equal(cell3,null,"位于左边缘的单元格无左邻居单元格");
});
test("setCellContent",function(){
    var table = getTable("<tr><td rowspan='2'>1</td><td>2</td><td>3</td></tr>" +
            "<tr><td>2</td><td>3</td></tr>"),
        ut = new UT(table);
    var cell = table.rows[0].cells[0];
    ut.setCellContent(cell,"这是测试内容");
    equal(cell.innerHTML,"这是测试内容","设置了正确的内容");
    ut.setCellContent(cell);
    equal(cell.innerHTML,browser.ie ? domUtils.fillChar : "<br>");
});

test("cloneCell",function(){
    var table = getTable("<tr><td style='border-top-color: red;border-bottom-color: green' rowspan='2'>1</td><td>2</td><td>3</td></tr>" +
            "<tr><td class='selectedClass'>2</td><td>3</td></tr>"),
        ut = new UT(table);

    var cell = ut.cloneCell(table.rows[0].cells[0]);
    equal(cell.rowSpan,2,"clone了一个2行一列的单元格");
    equal(cell.style.borderTopColor,"green","上边框的颜色将会被下边框取代");
    cell = ut.cloneCell(table.rows[0].cells[0],true);
    ok(cell.rowSpan,1,"忽略被合并单元格时将会充值单元格的rowspan和colspan为1")
});



test("getCellsRange、getCells",function(){
    var table = getTable("<tr><td rowspan='2'>1</td><td>2</td><td>3</td></tr>" +
            "<tr><td class='selectedClass'>2</td><td>3</td></tr>"),
        ut = new UT(table);
    var range = ut.getCellsRange(table.rows[0].cells[1],table.rows[1].cells[0]);
    ok(range.beginRowIndex===0 && range.beginColIndex===1 && range.endRowIndex===1 && range.endColIndex===1,"获取到range")

    var cells = ut.getCells(range);
    ok(cells.length ==2,"获取到2个单元格");
    ok(cells[0] == table.rows[0].cells[1],"第一个单元格存在");
});

test("insertRow、deleterRow",function(){
    var table = getTable("<tr><td rowspan='2'>1</td><td>2</td><td>3</td></tr>" +
            "<tr><td class='selectedClass'>2</td><td>3</td></tr>"),
        ut = new UT(table);

    var cellPrototype = document.createElement("td");
    cellPrototype.innerHTML = "aa";
    cellPrototype.setAttribute("vAlign","top");
    ut.insertRow(2,cellPrototype);
    ok(table.rows.length ===3,"行数变成3行");
    ok(table.rows[2].cells[0].getAttribute("vAlign") =="top","新插入的单元格中包含原型单元格中的属性");

});

test("mergeRight,mergeDown",function(){
    var table = getTable("<tr><td rowspan='3'>1</td><td>2</td><td>3</td><td rowspan='2'>4</td><td>5</td><td>6</td></tr>" +
                         "<tr><td>2</td><td>3</td><td>5</td><td>6</td></tr>"+
                         "<tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>"),
        ut = new UT(table);
    var cell = table.rows[0].cells[1];
    ut.mergeDown(cell);
    ok(cell.rowSpan===2,"向下合并成功");

    ut.mergeDown(cell);
    ok(cell.rowSpan===3,"向下合并成功");

    cell = cell.previousSibling;
    ut.mergeRight(cell);
    ok(cell.rowSpan===3 && cell.colSpan ===2,"向右合并成功");

    equal(cell.parentNode.rowIndex,0,"合并到了正确的位置" )
});
test("split",function(){
    var table = getTable("<tr><td rowspan='3'>1</td><td>2</td><td>3</td><td rowspan='2' colspan='2'>4</td><td>6</td><td>7</td></tr>" +
            "<tr><td>2</td><td>3</td><td>6</td><td>7</td></tr>"+
            "<tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>"),
        ut = new UT(table);
    var cell = table.rows[0].cells[0],
        num = table.getElementsByTagName("td").length;
    ut.splitToCells(cell);
    ok(cell.rowSpan==1&&cell.colSpan==1,"单元格被成功拆分");

    var newNum = table.getElementsByTagName("td").length;
    ok(num+2 ==newNum,"单元格数量增加了2个");

    cell = table.rows[0].cells[3];
    ut.splitToCols(cell);
    ok(cell.colSpan===1 && cell.rowSpan==2 ,"被拆分成了2列");



});

test("selectRow",function(){
    var table = getTable("<tr><td rowspan='3'>1</td><td>2</td><td>3</td><td rowspan='2' colspan='2'>4</td><td>6</td><td>7</td></tr>" +
            "<tr><td>2</td><td>3</td><td>6</td><td>7</td></tr>"+
            "<tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>"),
        ut = new UT(table);
    ut.selectRow(1);
    equal(ut.selectedTds.length,table.getElementsByTagName("td").length,"选中了所有单元格")
    var cells = table.rows[1].cells,
        flag = false;
    utils.each(cells,function(cell){
        if(cell.className==""){
            flag = true;
        }
    });
    ok(!flag,"所有单元格都被选中");
    ok(ut.cellsRange.beginRowIndex===0,"cellsRange正确");

});
test("selectTable",function(){
    var table = getTable("<tr><td rowspan='3'>1</td><td>2</td><td>3</td><td rowspan='2' colspan='2'>4</td><td>6</td><td>7</td></tr>" +
            "<tr><td>2</td><td>3</td><td>6</td><td>7</td></tr>"+
            "<tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>"),
        ut = new UT(table);
    ut.selectTable();
    ok(ut.selectedTds.length === table.getElementsByTagName("td").length,"选中了整个表格")

});

test("sortTable",function(){
    var table = getTable("<tr><td>01</td><td>2</td><td>3</td><td>4</td><td>6</td><td>7</td></tr>" +
            "<tr><td>11</td><td>2</td><td>3</td><td>4</td><td>6</td><td>7</td></tr>" +
            "<tr><td>21</td><td>2</td><td>3</td><td>4</td><td>6</td><td>7</td></tr>"),
        ut = new UT(table);
    ut.sortTable(1,function(a,b){
        return 1;//逆序
    });
    var value = table.rows[0].cells[0].innerHTML;
    equal(value,"21","单元格被逆序");

    ut.sortTable(0,function(td1,td2){
        var value1 = parseInt(td1.innerHTML,10),
            value2 = parseInt(td2.innerHTML,10);
        return value2 - value1;
    })
    value = table.rows[0].cells[0].innerHTML;
    equal(value,"21","按数值从大到小排列");
});

test("setBackground",function(){
    var table = getTable("<tr><td>01</td><td>2</td><td>3</td><td>4</td><td>6</td><td>7</td></tr>" +
            "<tr><td>11</td><td>2</td><td>3</td><td>4</td><td>6</td><td>7</td></tr>" +
            "<tr><td>21</td><td>2</td><td>3</td><td>4</td><td>6</td><td>7</td></tr>"),
        ut = new UT(table);
    ut.setBackground(table.getElementsByTagName("td"),"green");
    var cell = table.rows[1].cells[1];
    ok(cell.style.backgroundColor=="green","单种背景颜色设置成功");

    ut.removeBackground(table.getElementsByTagName("td"));
    ok(cell.style.backgroundColor=="","背景颜色被清除");

    ut.setBackground(table.getElementsByTagName("td"),{
        repeat:true,
        colorList:["green","red"]
    })
    ok(table.rows[0].cells[0].style.backgroundColor == "green","第一行的单元格为绿色");
    ok(table.rows[1].cells[0].style.backgroundColor =="red","第二行的单元格为红色");


});