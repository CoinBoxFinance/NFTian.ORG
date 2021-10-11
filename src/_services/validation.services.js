
export const formValidation = {
    loginvalidation,

    Register_validation,
    item_validation,
    password_validation,
    item_validation_auction
    
  
};

function loginvalidation(params,errors) {
  
    let fields = params;
    // let errors :any = [];

  
 
    // let emailvalid = false
  
    errors.formIsValid = true;
    if (!fields["email"] || fields["email"].trim()==="") {
      errors.formIsValid = false;
      errors.email='E-mail/Username field can’t be empty.'
   }else{
    errors.email = "";
   }
    // if (fields["email"] !== "") {
    //   var pattern = new RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i);
    //   if (!pattern.test(fields["email"])) {
    //     errors.formIsValid = false;
    //     errors.email='Entered E-mail address is not valid.'
    //   }else{
    //     // emailvalid = true
    //     errors.email=''
    //    }
    // } 
    if (!fields["password"] || fields["password"].trim()==="") {
      errors.formIsValid = false;
      errors.password = 'Password field can’t be empty.'
      } else{
      errors.password = "";
      }
   
      // if (fields["password"] && fields["password"].length<6 && fields["password"]!=="") {
      //   errors.formIsValid = false;
      //   errors.password = 'Password must be at least 6 characters.'
      //  }else{
      //   if (fields["password"].trim()=="") {
      //     errors.formIsValid = false;
      //     errors.password = 'Password field can’t be empty.'
      //     } else{
      //     errors.password = "";
      //     }
       
      // }
  
  
  
    return errors;

}


function Register_validation(params,errors) {
  let fields = params;
  // let emailvalid = false

  errors.formIsValid = true;
  if (!fields["email"] || fields["email"].trim()==="") {
    errors.formIsValid = false;
    errors.email='E-mail field can’t be empty.'
 }else{
  errors.email = "";
 }
  if (fields["email"] &&fields["email"] !== "") {
    var pattern = new RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i);
    if (!pattern.test(fields["email"])) {
      errors.formIsValid = false; 
      errors.email='Entered E-mail address is not valid.'
    }else{
      // emailvalid = true
      errors.email=''
     }
  } 
  if (!fields["password"] || fields["password"].trim()==="") {
    errors.formIsValid = false;
    errors.password = 'Password field can’t be empty.'
    } else if (fields["password"] && fields["password"].length<8 && fields["password"]!=="") {
      errors.formIsValid = false;
      errors.password = 'Password must be at least 8 characters.'
     }else if (fields["password"] && fields["password"].trim()=="") {
        errors.formIsValid = false;
        errors.password = 'Password field can’t be empty.'
        } 
     
    
    if (!fields["cpassword"]) {
    errors.formIsValid = false;
    errors.cpassword= 'Confirm Password field can’t be empty.'; 
    }else if (fields["cpassword"] && fields["cpassword"].trim()=="") {
      errors.formIsValid = false;
      errors.cpassword= 'Confirm Password field can’t be empty.'; 
      }else  if(fields["cpassword"] !== fields["password"]){
      errors.formIsValid = false;
      errors.cpassword= 'Password and Confirm password doesn’t match.'
    
    }else{
      errors.cpassword = "";
      }
     
        
  return errors;


}


function password_validation(params,errors){
  let fields = params;
  // let emailvalid = false
   errors.formIsValid = true;
  if (!fields["password"] || fields["password"].trim()==="") {
    errors.formIsValid = false;
    errors.password = 'Password field can’t be empty.'
    } else   if (fields["password"] && fields["password"].trim().length<8 && fields["password"]!=="") {
      errors.formIsValid = false;
      errors.password = 'Password must be at least 8 characters.'
     }else if (fields["password"] && fields["password"].trim()=="") {
        errors.formIsValid = false;
        errors.password = 'Password field can’t be empty.'
        } 
    
    if (!fields["cpassword"]) {
    errors.formIsValid = false;
    errors.cpassword= 'Confirm Password field can’t be empty.'; 
    }else{
    errors.cpassword = "";
    }

    if (fields["cpassword"] && fields["cpassword"].trim()=="") {
      errors.formIsValid = false;
      errors.cpassword= 'Confirm Password field can’t be empty.'; 
      }else{
      errors.cpassword = "";
      }
    if(fields["cpassword"] !== fields["password"]){
      errors.formIsValid = false;
      errors.cpassword= 'Password and Confirm password doesn’t match.'
    
    }else{
      errors.cpassword = "";
      }
      return errors;
}


function item_validation(params,errors){
  let fields = params;
  // let emailvalid = false
   errors.formIsValid = true;
   if (!fields["image"]) {
    errors.formIsValid = false;
    errors.image = 'Please select item Image.'
    } 
  if (!fields["name"] || fields["name"].trim()==="") {
    errors.formIsValid = false;
    errors.name = 'Item Name field can’t be empty.'
    } else if (fields["name"] && fields["name"].trim().length<3 && fields["name"]!=="") {
      errors.formIsValid = false;
      errors.name = 'Item Name must be at least 3 characters.'
     }else if (fields["name"] && fields["name"].length>25 && fields["name"]!=="") {
      errors.formIsValid = false;
      errors.name = 'Item name should be maximum 25 charchters.'
     }
     if (!fields["description"]) {
      errors.formIsValid = false;
      errors.description = 'Item description field can’t be empty.'
      }else if(fields["description"] && fields["description"].trim()== "" ){
        errors.formIsValid = false;
        errors.description = 'Item description field can’t be empty.'
      }

    if (!fields["price"] || fields["price"].trim()=="") {
      errors.formIsValid = false;
      errors.price= 'Price field can’t be empty.'; 
      }else if (fields["price"]) {

          if(fields["price"] % 1 != 0 ){
            // alert(isNaN(fields["price"]) )
            if(isNaN(fields["price"])){
              
              errors.formIsValid = false;
              errors.price= 'Enter a valid price.';  
            }
        
          }else{
          
              if(fields["price"]== 0) {
                errors.formIsValid = false;
                errors.price= 'Price can not be  0.';
                }
          }
        
        }
  
      return errors;
}

// item_validation_auction

function item_validation_auction(params,errors){
  let fields = params;
  // let emailvalid = false
   errors.formIsValid = true;
   if (!fields["image"]) {
    errors.formIsValid = false;
    errors.image = 'Please select item Image.'
    } 
  if (!fields["name"] || fields["name"].trim()==="") {
    errors.formIsValid = false;
    errors.name = 'Item Name field can’t be empty.'
    } else if (fields["name"] && fields["name"].trim().length<3 && fields["name"]!=="") {
      errors.formIsValid = false;
      errors.name = 'Item Name must be at least 3 characters.'
     }else if (fields["name"] && fields["name"].length>25 && fields["name"]!=="") {
      errors.formIsValid = false;
      errors.name = 'Item name should be maximum 25 charchters.'
     }
     if (!fields["description"]) {
      errors.formIsValid = false;
      errors.description = 'Item description field can’t be empty.'
      }else if(fields["description"] && fields["description"].trim()== "" ){
        errors.formIsValid = false;
        errors.description = 'Item description field can’t be empty.'
      }
      return errors;
}