const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = process.env.PORT || 8080;
const mysql = require("mysql2");
const { deprecate } = require("util");
const { error } = require("console");
let Faculty;
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Yuvi@108',
    database : 'first'
});
async function DB(){
    await connection.connect();
}
DB()
.then(()=>{
    console.log("Connection Estabilshed");
})
.catch((err)=>{
    console.log("Error is", err);
});
let data = async function (){
        // await connection.execute(`Select * from Employee`, (err,result,fields)=>{
        // console.log(result);
        // console.log(fields);

    //}
    //);
    console.log("Hello DB");
}

data()
.then(()=>{
    console.log("Query Executed");
})
.catch((error)=>{
    console.log(error);
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));

app.listen(port , ()=>{
    console.log(`App is listening on ${port}`);
    console.log(`http://localhost:${port}`);
});



app.get("/",(req,res) =>{
    // res.send(" LOG IN PAGE.....")
    res.render("home1.ejs");
    //console.log(req.body);
});

app.post("/data",async (req,res)=>{
    console.log(req.body);
    //res.send('<script>alert("Form Submitted")</script>');
    let Empid = req.body.username;
    let password = req.body.password;
    // console.log(name);
    // console.log(password);
    
    await connection.execute("Select Empid,Empname From Employee where Empid = ?",[Empid], async (error,results,field)=>{
        if(error)
        {
            console.log(error);
        }
        // else
        // {
                console.log(results);
        //     console.log(result[0].Deptid);
        // }
        if(results[0] != null)
        {
            if(Empid != results[0].Empid)
            {
             res.redirect("/");
            }
            if(Empid == results[0].Empid)
            {
            await connection.execute('Select password From Employee where Empid = ?',[Empid],(err,result,field)=>{
                if(err)
                {
                    console.log(err);
                }
                if(password == result[0].password)
                    {
                        Faculty = results[0];
                        console.log("******************************");
                        console.log(Faculty);
                        console.log("******************************");
                        console.log("User Verified");
                        res.render("dashboard.ejs",{Faculty,User});


                        app.get("/createnotesheet",(req,res)=>{
                            res.render("createnotesheet.ejs");
                        });
                        app.get("/viewns",(req,res)=>{
                            res.render("viewns.ejs");
                        });
                        app.get("/Approvens",(req,res)=>{
                            res.render("Approvens.ejs");
                        });
                        
                        app.get("/dashboard",(req,res)=>{
                                res.render("dashboard.ejs",{Faculty,User});
                        });
                        
                    }
                    else{
                        res.send("Password is incorrect");
                    }
                }); 
            }
       }else{
            res.send("Username not found");
       }

    });
});

// app.get("/logadmin",(req,res)=>{
//     // res.send("I am admin page.....");
//     res.render("logadmin.ejs");
// });

app.get("/admin",(req,res)=>{
    //res.send("I am REAL admin.....")
    res.render("admin.ejs");


});
// Admin Pannel
app.post("/create", async (req,res)=>{
    console.log(req.body);
    res.header({
        status : 200,
        message : "okkk"
    });
    
    let Empid = req.body.username;
    let Fid = req.body.Faculty;
    let Dep = req.body.Dep;
    let name = req.body.Ename;
    let password = req.body.password;
    let passwordConfirm = req.body.passwordC;
    let email = req.body.email;
    let mobno = req.body.mobno;
    let Desgn = req.body.Desg;

    // console.log(Empid);
    // console.log(Fid);
    // console.log(Dep);
    // console.log(name);
    // console.log(password);
    // console.log(passwordConfirm);
    // console.log(email);
    // console.log(mobno);
    // console.log(Desgn);

    //Faculties code 
    console.log(Fid);

    if(Fid == "Engineering")
    {
        Fid = "f01";
    };
    if(Fid == "Pharmacy")
    {
        Fid = "f04";
    };
    if(Fid == "Agriculture")
    {
        Fid = "f05";
    };
    if(Fid == "Science")
    {
        Fid = "f08";
    };
    if(Fid == "Law")
    {
         Fid = "f02";
    };
    if(Fid == "Management")
    {
       Fid = "f03";
    };
    if(Fid == "Commerce")
    {
        Fid = "f07";
    };
    if(Fid == "Arts and Humanities")
    {
        Fid = "f06";
    };
    console.log(Fid);

    // Departments codes ---


    //Engineering
    if(Dep == "Computer Science & Engineering")
        {
            Dep = "d01";
        };
        if(Dep == "Information Technology")
        {
            Dep = "d02";
        };
        if(Dep == "Mechanical Engineering")
        {
            Dep = "d03";
        };
        if(Dep == "Electronics Engineering")
        {
            Dep = "d04";
        };
        if(Dep == "Civil Engineering")
        {
            Dep = "d05";
        };
        if(Dep == "Electrical Engineering")
        {
            Dep = "d06";
        };
        // Science
        if(Dep == "Computer Application")
        {
            Dep = "d07";
        };
        //Management
        if(Dep == "Management")
        {
            Dep = "d08";
        }; 
        //commerce
        if(Dep == "Commerce")
            {
                Dep = "d09";
            };
            // Agriculture
            if(Dep == "Agriculture")
            {
                Dep = "d10";
            };
            // Science
            if(Dep == "Physics")
            {
                Dep = "d11";
            };
            if(Dep == "Chemistry")
            {
                Dep = "d12";
            };
            if(Dep == "Mathematics")
            {
                Dep = "d13";
            };
            if(Dep == "Computer Science")
            {
                Dep = "d14";
            };
            if(Dep == "Forensic Science")
            {
                Dep = "d15";
            };
            if(Dep == "Bio Technology")
            {
                Dep = "d16";
            }; 
            // Pharmacy
            if(Dep == "Pharmacy")
                {
                    Dep = "d17";
                };
                // arts
                if(Dep == "Language")
                {
                    Dep = "d18";
                };

                // Law
                if(Dep == "Law")
                    {
                        Dep = "d19";
                    };      


    await connection.execute("Insert into EMPLOYEE values (?,?,?,?,?,?,?,?)",[
        Fid ,
        Dep , 
        Empid,
        name ,
        Desgn, 
        password ,
        email ,
        mobno
    ],(err,result,fields)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            res.redirect("/admin");
            //res.send("<script>alert('User Created')</script>");
        }
    })
})

let User = {
    name : "One",
    marks : 10
}

// app.get("/createnotesheet",(req,res)=>{
//     res.render("createnotesheet.ejs");
// });
// app.get("/viewns",(req,res)=>{
//     res.render("viewns.ejs");
// });
// app.get("/Approvens",(req,res)=>{
//     res.render("Approvens.ejs");
// });

// app.get("/dashboard",(req,res)=>{
//         res.render("dashboard.ejs",{Faculty,User});
// });


// app.get("/user",(req,res)=>{
//     res.render("user.ejs");
// });

// app.get("/cat",()=>{
//     catcontrol;
// });





























// Admin Pannel ----- View Notesheet

app.get("/one",async (req,res)=>{
    await connection.execute("Select * from Notesheet",async (err,resu,field)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            await console.log(resu);
            let Notesheet = resu;
            await res.render("one.ejs",{Notesheet});
        }

    })
});































app.get("/viewNotesheets" ,async (req,res)=>{
    await connection.execute(`SELECT A.NOTEID,N.DATEANDTIME,
CASE
WHEN E.DESIGNATION='HOD' THEN 'PENDING'
WHEN E.DESIGNATION='DEAN' THEN 'PENDING'
WHEN E.DESIGNATION='PROVC' THEN 'PENDING'
WHEN E.DESIGNATION='OSD' THEN 'PENDING'
WHEN E.DESIGNATION='VC' THEN 'APPROVED'
END
AS STATUS FROM APPROVED A JOIN EMPLOYEE E ON A.APROVEDBY=E.EMPID
JOIN NOTESHEET N ON A.NOTEID=N.NOTEID;` , (error,result,field)=>{
    console.log(result);
    console.log(error);
})
});



app.get("/approveNotesheet", async(req,res)=>{
    await connection.execute(`SELECT N.NOTEID,N.DATEOFAPPROVAL FROM APPROVED A;`),(error,result)=>{
        console.log(error);
    }
})

<---------------------my code ------------------------>

// routes/approval.js
const express = require('express');
const router = express.Router();

// Mock data for demonstration
let notesheets = [
    { id: 1, title: 'Notesheet 1', status: 'Pending' },
    { id: 2, title: 'Notesheet 2', status: 'Approved' },
];

// GET route for the approval notesheet page
router.get('/', (req, res) => {
    res.render('approval', { notesheets });
});

// POST route for approving a notesheet
router.post('/approve/:id', (req, res) => {
    const { id } = req.params;
    const notesheet = notesheets.find(ns => ns.id == id);

    if (notesheet) {
        notesheet.status = 'Approved';
        res.redirect('/approval');
    } else {
        res.status(404).send('Notesheet not found');
    }
});

module.exports = router;

<--------------------------------------- 2nd ------------------------------------------>
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let notesheets = [];

// Home route
app.get('/', (req, res) => {
    res.render('index', { notesheets });
});

// Add notesheet
app.post('/add', (req, res) => {
    const { title, status } = req.body;
    notesheets.push({ title, status });
    res.redirect('/');
});

// Update status
app.post('/update/:index', (req, res) => {
    const { status } = req.body;
    const index = req.params.index;
    if (notesheets[index]) {
        notesheets[index].status = status;
    }
    res.redirect('/');
});

// Delete notesheet
app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    if (notesheets[index]) {
        notesheets.splice(index, 1);
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});
