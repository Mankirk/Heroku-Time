var express=require('express');
var fs=require('fs');
var app=express();

app.get('/',function(req,res){
    console.log("request made for "+req.url);
    console.log(req.params);
    fs.createReadStream('./index.html').pipe(res);
    
    
});

app.get('/:time',function(req,res){
    console.log('request made for'+req.url);
    console.log(req.params.time);
    
    function unixToNormal(unix){
        var date=new Date(unix*1000);
        var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
       
        var month=months[date.getMonth()];
        var day=date.getDate();
        var year=date.getFullYear();
        
        var result=month +' '+ day +', '+year;
        return result;
    }
    if(!isNaN(req.params.time)){
        var result=unixToNormal(req.params.time);
        var data={unix: req.params.time, natural:result
        }
        res.json(data);
    }
    else{
        var natural=new Date(req.params.time);
        if(!isNaN(natural)){
            var unix=natural /1000;
            var data2={unix:unix,natural:req.params.time};
            res.json(data2);
        }
        else{
            res.json({unix:null,natural:null});
        }
    }
    
})

app.listen(process.env.PORT || 8080,function(){
    console.log('server is online');
})