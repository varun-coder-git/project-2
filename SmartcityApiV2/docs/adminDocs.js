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
/Admin/Register: 
*   post: 
*     description: Admin Registration.
*     tags:
*     - Admin
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
/Admin/VerifyOTP: 
*   post: 
*     description: Verify otp send on email
*     tags:
*     - Admin
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
 *   adminResendOTPModel:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Admin/ResendOTP: 
*   post: 
*     description: Resend Email OTP.
*     tags:
*     - Admin
*     summary: Resend Email OTP.
*     parameters: 
*     - name: Model 
*       description:  Resend Email OTP.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/adminResendOTPModel'
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
/Admin/Profile: 
*   post: 
*     description: Get Admin Details.
*     tags:
*     - Admin
*     summary: Get Admin Details.
*     parameters: 
*     - name: Model 
*       description: Get Admin Details.
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
/Admin/UpdateProfile: 
*   put: 
*     description: Update Admin Details.
*     consumes:
*        - multipart/form-data
*     tags:
*     - Admin
*     summary: Update Admin Details.
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
*       required: false
*       description: Enter blood_group_id.
*     - in: formData
*       name: full_name 
*       type: string 
*       required: true
*       description: Enter full name.
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
/Admin/ChangePassword: 
*   post: 
*     description: Change old password
*     tags:
*     - Admin
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


/** 
 * @swagger 
 * definitions:
 *   AdminForgetPasswordModel:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Admin/ForgetPassword: 
*   post: 
*     description: Reset Admin Password.
*     tags:
*     - Admin
*     summary: Reset Admin Password.
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AdminForgetPasswordModel'
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
 *   AdminResetPasswordModel:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *       new_password:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Admin/ResetPassword: 
*   put: 
*     description: Reset Admin Password.
*     tags:
*     - Admin
*     summary: Reset Admin Password.
*     parameters: 
*     - name: Model 
*       description: Reset Admin Password.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AdminResetPasswordModel'
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
 *   AdminProfileModel:
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
/Admin/AdminProfileInfo: 
*   post: 
*     description: Get Admin Details.
*     tags:
*     - Admin
*     summary: Get Admin Details.
*     parameters: 
*     - name: Model 
*       description: Get Admin Details.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AdminProfileModel'
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
 *   VerifyAdminChangePasswordModel:
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
/Admin/VerifyAdminChangePassword: 
*   post: 
*     description: Reset Admin Password.
*     tags:
*     - Admin
*     summary: Reset Admin Password.
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/VerifyAdminChangePasswordModel'
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

