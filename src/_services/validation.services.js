
export const formValidation = {
    loginvalidation,

    Register_validation,

    password_validation
    
  
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