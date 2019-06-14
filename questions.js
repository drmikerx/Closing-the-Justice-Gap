module.exports = function(){
    var express = require('express');
    var router = express.Router();

  // Display categories for ask question page
  
    function getCategories(res, mysql, context, complete){
        mysql.pool.query("SELECT c_id, cname FROM QuestionCategories;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.category  = results;
            complete();
        });
}

  // When page loads, display all categories in drop down
  
  router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getCategories(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('questionMain', context);
            }

        }
    });
    
    // When user submits a new question, add it to the database and refresh page
   
    router.post('/', function(req, res){       
        var mysql = req.app.get('mysql');
        //var sql = "INSERT INTO QnA SET c_id=(SELECT c_id FROM QuestionCategories WHERE cname =?), q_text=?;";
        var sql = "INSERT INTO QnA (c_id, q_text) VALUES (?,?);";
        var inserts = [req.body.categoryId, req.body.userQuestion];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/questionMain');
            }
        });
});
  
    
    return router;
}();
