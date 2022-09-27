/** 
 * @swagger 
 * definitions:
 *   GoogleLoginModel:
 *     properties:
 *       imageUrl:
 *         type: string
 *         required: true
 *       email:
 *         type: string
 *         required: true
 *       givenName:
 *         type: string
 *         required: true
 *       familyName:
 *         type: string
 *         required: true
 *       login_type:
 *         type: string
 *         required: true
 *       Id:
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
/Social/SocialLogin: 
*   post: 
*     description: Login via Social.
*     tags:
*     - Social
*     summary: Login via Social.
*     parameters: 
*     - name: Model 
*       description: Login via Social.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GoogleLoginModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Logged In Successful.
*       400: 
*         description: Failed to login/Failed to register.
*       403: 
*         description: Please update your email id in your Facebook account to login. Or please login using your Gmail ID or register as new user.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GoogleProfileModel:
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
/Social/SocialProfile: 
*   post: 
*     description: Get User Social Profile.
*     tags:
*     - Social
*     summary: Get User Social Profile.
*     parameters: 
*     - name: Model 
*       description: Get User Social Profile.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GoogleProfileModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful.
*       401: 
*         description: Failed to authenticate token.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   UpdateGoogleProfileModel:
 *     properties:
 * 
 */
/** 
 * @swagger
/Social/UpdateSocialProfile: 
*   put: 
*     description: Update User Social Profile.
*     consumes:
*        - multipart/form-data
*     tags:
*     - Social
*     summary: Update User Social Profile.
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
*       description: reference file 
*     - in: formData
*       name: user_id 
*       type: integer 
*       required: true
*       description: reference user_id 
*     - in: formData
*       name: token 
*       type: string 
*       required: true
*       description: reference token 
*     - in: formData
*       name: blood_group 
*       type: integer 
*       required: false
*       description: reference blood_group 
*     - in: formData
*       name: dob 
*       type: string 
*       required: false
*       description: reference dob 
*     - in: formData
*       name: emergency_number 
*       type: integer 
*       required: false
*       description: reference emergency_number  
*     - in: formData
*       name: address 
*       type: string 
*       required: false
*       description: reference address  
*     - in: formData
*       name: city 
*       type: string 
*       required: true
*       description: reference city  
*     - in: formData
*       name: pincode 
*       type: integer 
*       required: true
*       description: reference pincode  
*     - in: formData
*       name: ward_id 
*       type: integer 
*       required: true
*       description: reference ward_id  
*     - in: formData
*       name: is_profile_complete 
*       type: boolean 
*       required: true
*       description: reference is_profile_complete flag  
*     - in: formData
*       name: phone_number 
*       type: string 
*       required: true
*       description: reference phone_number  
*       schema: 
*          $ref: '#/definitions/UpdateGoogleProfileModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Updated Successful.
*       400: 
*         description: Failed to update data.
*       401: 
*         description: Failed to authenticate token.
*       403: 
*         description: File not uploaded!!.
*       500:
*         description: Internal server error. 
*   
*/