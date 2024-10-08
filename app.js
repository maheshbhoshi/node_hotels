const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/college")
.then(() => console.log("connection succesfully"))
.catch((err) => console.log(err));

// required validator plugins
const validator = require("validator");

//create schema and structure 

const studentsSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"Minimum length is 3"],
        maxlength:[10,"Maximum length is 10"]
    },
    mno:{
        type:Number,
        reuired:true,

        //validation of cutom in mongodb schema validations. step one way.
        // validate(value){
        //     if(value.toString().length < 10 ||  value.toString().length > 10){
        //         throw new Error("Mobile number  is incorrect.")
        //     }
        // }

        validate:{
            validator: function(value){
                return value.toString().length === 10;
            },
            message:"Mobile Number is Incorrect .!"
        }

    },
    email:{
        type:String,
        required:true,
        unique:true,

        // one way vallidation step.
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Email is Invalid..!");
        //     }
        // }

        validate:{
            validator:function(value){
                
                return validator.isEmail(value)
                
            },
            message:"Email Is Invalid...! "
        }
    },
    fees:{
        type:Boolean,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

// model created and database collections.
const student = mongoose.model("student",studentsSchema);


// create one function and insert data in database.

const createStudents =  async () => {
    try{
        
        const createobj1 = new student({
            name:"Shubham",
            mno:"7028141192",
            fees:true,
            email:"shubham@gmail.com"
        } 
      );

//       const createobj2 = new student({
//         name:"Shubham",
//         mno:"9999999999",
//         fees:true
//     } 
//   );

        const studentData = await student.insertMany([createobj1]);
        console.log(studentData);
    }catch (error){
        console.log(error.message)
    }
}

createStudents();

//read data in database

const readData = async () =>{
    try {
        const result = await student.find({})
        .select({name:1,mno:1})
        .sort({mno:-1});
                console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}

// readData()

const updateDocument = async (id) =>{
    try {
        //find id and update the records.


        // const result = await student.updateOne({_id:id},{
        //     $set:{
        //         name:"Shailesh Bhosikar"
        //     }
        // });

        const result = await student.findByIdAndUpdate({_id:id},{
                $set:{
                    name:"Shailesh Bhosikar"
                }
            },
            {
                new:true
            });
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}

let id = "66ff998880b93e6ae0a85ca9";

// updateDocument(id);


const deleteDocument = async (id) =>{
    try {
        const result =  await student.deleteOne({_id:id});
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }

}

// deleteDocument("66ff998880b93e6ae0a85ca9")