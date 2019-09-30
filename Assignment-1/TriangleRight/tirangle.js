function triangle(number){
    var triangle = '';
    for (var i =number; i>0; i--){
        for(var j = 1; j<=i; j++){
            triangle = triangle + '*';
        }
        triangle = triangle + '\n';
    }
    return console.log(triangle);
}

triangle(5);