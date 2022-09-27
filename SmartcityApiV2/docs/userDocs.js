/** 
 * @swagger 
 * definitions:
 *   UserLoginModel:
 *     properties:
 *       phoneNumber:
 *         type: integer
 *         required: true
 *       password:
 *         type: string
 *         required: true
 *       latitude:
 *         type: string
 *         required: true
 *       longitude:
 *         type: string
 *         required: true
 *       address:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Smartcity/Login: 
*   post: 
*     description: User Login.
*     tags:
*     - User
*     summary: User Login.
*     parameters: 
*     - name: Model 
*       description: User Login.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UserLoginModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Logged in Successful.
*       400:
*         description: Something went wrong/Inactive account,please verify mobile number first!!
*       402: 
*         description: Invalid credentials.
*       404:
*         description: Data Not Found/Account is disable.
*       500:
*         description: Internal server error   
*   
*/

/** 
 * @swagger 
 * definitions:
 *   AdminLoginModel:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *       password:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Smartcity/AdminLogin: 
*   post: 
*     description: Admin Login.
*     tags:
*     - User
*     summary: Admin Login.
*     parameters: 
*     - name: Model 
*       description: Admin Login.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AdminLoginModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Logged in Successful.
*       402: 
*         description: Invalid credentials.
*       404:
*         description: Data Not Found/Account is disable.
*       500:
*         description: Internal server error   
*   
*/

/** 
 * @swagger 
 * definitions:
 *   RegisterModel:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *       password:
 *         type: string
 *         required: true
 *       full_name:
 *         type: string
 *         required: true
 *       phonenumber:
 *         type: integer
 *         required: true
 *       pincode:
 *         type: integer
 *         required: true
 *       ward_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Smartcity/Register: 
*   post: 
*     description: User Registration.
*     tags:
*     - User
*     summary: User Registration.
*     parameters: 
*     - name: Model 
*       description: User Registration.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/RegisterModel'
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Registration Successful.
*       400: 
*         description: Something went wrong.
*       401: 
*         description: Failed to register.
*       402: 
*         description: Invalid credentials.
*       403: 
*         description: Email or Phone Number already exist.
*       404:
*         description: Data Not Found/Account is disable/Pincode doesn't exits.
*       500:
*         description: Internal server error. 
*/

/** 
 * @swagger 
 * definitions:
 *   MobileOTPModel:
 *     properties:
 *       phonenumber:
 *         type: integer
 *         required: true
 *       otp:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Smartcity/MobileOTP: 
*   post: 
*     description: Verify mobile OTP.
*     tags:
*     - User
*     summary: Verify mobile OTP.
*     parameters: 
*     - name: Model 
*       description: Verify mobile OTP.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/MobileOTPModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: OTP match.
*       400:
*         description: Something went wrong.
*       401:
*         description: OTP expired/OTP doesn't match!!!.
*       402: 
*         description: Invalid credentials.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   userResendOTPModel:
 *     properties:
 *       phonenumber:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Smartcity/ResendOTP: 
*   post: 
*     description: Resend mobile OTP.
*     tags:
*     - User
*     summary: Resend mobile OTP.
*     parameters: 
*     - name: Model 
*       description:  Resend mobile OTP.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/userResendOTPModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: OTP Resend Successful.
*       400:
*         description: Something went wrong.
*       401: 
*         description: Failed to resend OTP.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   ProfileModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Smartcity/Profile: 
*   post: 
*     description: Get User Details.
*     tags:
*     - User
*     summary: Get User Details.
*     parameters: 
*     - name: Model 
*       description: Get User Details.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/ProfileModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful.
*       402: 
*         description: Invalid credentials.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error. 
*/

/** 
 * @swagger 
 * definitions:
 *   UpdateProfileModel:
 *     properties:
 * 
 */
/** 
 * @swagger
/Smartcity/UpdateProfile: 
*   put: 
*     description: Update User Details.
*     consumes:
*        - multipart/form-data
*     tags:
*     - User
*     summary: Update User Details.
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: string
*                 format: binary
*     parameters: 
*     - in: formData
*       name: file 
*       type: file 
*       required: false
*       description: Upload Profile Image. 
*     - in: formData
*       name: user_id 
*       type: integer 
*       required: true
*       description: Enter user_id.
*     - in: formData
*       name: token 
*       type: string 
*       required: true
*       description: Enter token.
*     - in: formData
*       name: phoneNumber
*       type: string 
*       required: true
*       description: Enter phoneNumber.
*     - in: formData
*       name: email
*       type: string 
*       required: true
*       description: Enter email.
*     - in: formData
*       name: blood_group 
*       type: integer 
*       required: true
*       description: Enter blood_group_id.
*     - in: formData
*       name: dob 
*       type: string 
*       required: true
*       description: Enter dob.
*     - in: formData
*       name: emergency_number 
*       type: integer 
*       required: false
*       description: Enter emergency_number.
*     - in: formData
*       name: address 
*       type: string 
*       required: true
*       description: Enter address.
*     - in: formData
*       name: city 
*       type: string 
*       required: true
*       description: Enter city.  
*     - in: formData
*       name: pincode 
*       type: integer 
*       required: true
*       description: Enter pincode.
*     - in: formData
*       name: ward_id 
*       type: integer 
*       required: true
*       description: Enter ward_id.
*     - in: formData
*       name: is_profile_complete 
*       type: boolean 
*       required: true
*       description: Enter is_profile_complete flag.
*       schema: 
*          $ref: '#/definitions/UpdateProfileModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Update Successful/OTP Send Successful
*       400: 
*         description: Failed to update data/Something went wrong/Phone number already exists
*       401: 
*         description: Failed to authenticate token
*       402: 
*         description: Failed to send OTP/Email should be between 2 and 50 characters./Email is required./phoneNumber should be 10 characters.
*       403: 
*         description: Failed to upload file
*       404: 
*         description: Data Not Found
*       500: 
*         description: Internal server error
*   
*/

/** 
 * @swagger 
 * definitions:
 *   EmailOTPModel:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Smartcity/EmailOTP: 
*   post: 
*     description: Send otp on email.
*     tags:
*     - User
*     summary: Update User Details.
*     parameters: 
*     - name: Model 
*       description: Send otp on email.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/EmailOTPModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: OTP Send Successful.
*       402: 
*         description: Invalid credentials.
*       403:
*         description: Please check email ID or try again in sometime.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   VerifyOTPModel:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *       otp:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Smartcity/VerifyOTP: 
*   post: 
*     description: Verify otp send on email
*     tags:
*     - User
*     summary: Verify otp send on email
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/VerifyOTPModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: OTP match.
*       401: 
*         description: OTP expired/OTP doesn't match.
*       402: 
*         description: Invalid credentials.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   SetNewPasswordModel:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *       password:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Smartcity/SetNewPassword: 
*   post: 
*     description: Update user new password.
*     tags:
*     - User
*     summary: Update user new password.
*     parameters: 
*     - name: Model 
*       description: Update user new password.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/SetNewPasswordModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Password Set Successful.
*       402: 
*         description: Invalid credentials.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GetBloodGroupCategoryModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Smartcity/BloodGroup: 
*   post: 
*     description: Get Blood Group Details.
*     tags:
*     - User
*     summary: Get Blood Group Details.
*     parameters: 
*     - name: Model 
*       description: Get Blood Group Details.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetBloodGroupCategoryModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error   
*   
*/


/** 
 * @swagger
/Smartcity/Pincode: 
*   get: 
*     description: Get Pincode Details.
*     tags:
*     - User
*     summary: Get Pincode Details.
*     parameters: 
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error   
*   
*/

/** 
 * @swagger 
 * definitions:
 *   UserForgetPasswordModel:
 *     properties:
 *       phonenumber:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Smartcity/ForgetPassword: 
*   post: 
*     description: Reset User Password.
*     tags:
*     - User
*     summary: Reset User Password.
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UserForgetPasswordModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: OTP Send Successful.
*       400:
*         description: Something went wrong/You are not user.
*       401:
*         description: Failed to send OTP.
*       402: 
*         description: Invalid credentials.
*       403: 
*         description: Account is inactive.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error   
*   
*/

/** 
 * @swagger 
 * definitions:
 *   UserResetPasswordModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       new_password:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Smartcity/ResetPassword: 
*   put: 
*     description: Reset User Password.
*     tags:
*     - User
*     summary: Reset User Password.
*     parameters: 
*     - name: Model 
*       description: Reset User Password.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UserResetPasswordModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Password Set Successful.
*       402: 
*         description: Invalid credentials.
*       403:
*         description: Failed to save password.
*       500:
*         description: Internal server error.
*   
*/

/** 
 * @swagger 
 * definitions:
 *   SignoutModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Smartcity/Signout: 
*   post: 
*     description: Signout User.
*     tags:
*     - User
*     summary: Signout User.
*     parameters: 
*     - name: Model 
*       description: Signout User. 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/SignoutModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Signout Successful.
*       400: 
*         description: Something went wrong.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   ChangePasswordModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       old_password:
 *         type: string
 *         required: true
 *       new_password:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Smartcity/ChangePassword: 
*   post: 
*     description: Change old password
*     tags:
*     - User
*     summary: Change old password
*     parameters: 
*     - name: Data 
*       description: Enter Object
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/ChangePasswordModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Password Set Successful
*       400: 
*         description: Failed to set password
*       401: 
*         description: Failed to authenticate token
*       402: 
*         description: Old Password doesn't match
*       403: 
*         description: old_password should be at least 8 characters/new_password should be at least 8 characters
*       404:
*         description: Data Not Found
*       500:
*         description: Internal server error. 
*/