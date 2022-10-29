

const csvToJson = (stringData) => {

    var arrayOne= stringData.split('\r\n');
    var header=arrayOne[0].split(',');
    var noOfRow=arrayOne.length;
    var noOfCol=header.length;

    var jArray=[];

    var i=0,j=0;
    for (i = 1; i < noOfRow-1; i++) {

        var obj = {};
        var myNewLine=arrayOne[i].split(',');

        for (j = 0; j< noOfCol; j++) {
            var headerText = header[j].substring(1,header[j].length-1);
            var valueText = myNewLine[j].substring(1,myNewLine[j].length-1);
            obj[headerText] = valueText;
        };
        jArray.push(obj);
    };

    return jArray
}

export default csvToJson;