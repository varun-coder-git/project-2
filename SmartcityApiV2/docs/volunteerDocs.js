
//volunteer route
/** 
 * @swagger 
 * definitions:
 *   RegisterVolunteerModel:
 *     properties:
 */
/** 
 * @swagger
/Volunteer/RegisterVolunteer: 
*   post: 
*     description: Register new Volunteer.
*     tags:
*     - Volunteer
*     summary: Register new Volunteer.
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
*       name: token 
*       type: string 
*       required: true
*       description: Enter token 
*     - in: formData
*       name: user_id 
*       type: integer 
*       required: true
*       description: Enter user_id 
*     - in: formData
*       name:  title
*       type: string 
*       required: true
*       description: Enter title 
*     - in: formData
*       name: start_date 
*       type: string 
*       required: true
*       description: Enter start_date
*     - in: formData
*       name: end_date 
*       type: string 
*       required: true
*       description: Enter end_date  
*     - in: formData
*       name: category 
*       type: integer 
*       required: true
*       description: Enter category  
*     - in: formData
*       name: description 
*       type: string 
*       required: true
*       description: Enter description  
*     - in: formData
*       name: latitude 
*       type: string 
*       required: true
*       description: Enter latitude
*     - in: formData
*       name: longitude 
*       type: string 
*       required: true
*       description: Enter longitude  
*     - in: formData
*       name: address 
*       type: string 
*       required: true
*       description: Enter address 
*     - in: formData
*       name: share_location_flag 
*       type: boolean 
*       required: true
*       description: Enter share_location_flag  
*     - in: formData
*       name: file1
*       type: file 
*       required: false
*       description: Enter file1 
*     - in: formData
*       name: file2 
*       type: file 
*       required: false
*       description: Enter file2 
*     - in: formData
*       name: file3 
*       type: file 
*       required: false
*       description: Enter file3 
*       schema: 
*          $ref: '#/definitions/RegisterVolunteerModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Volunteer Registered Successful.
*       400: 
*         description: Something went wrong.
*       401: 
*         description: Failed to authenticate token.
*       402: 
*         description: File not uploaded!!
*       403: 
*         description: Please select category/start_date cannot be greater than end_date/start_date cannot be less than current_date.
*       500:
*         description: Internal server error. 
*/

/** 
 * @swagger 
 * definitions:
 *   CheckVolunteerModel:
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
/Volunteer/CheckVolunteer: 
*   post: 
*     description: Check volunteer status.
*     tags:
*     - Volunteer
*     summary: Check volunteer status.
*     parameters: 
*     - name: Model 
*       description: Check volunteer status.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/CheckVolunteerModel'
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
 *   CancelVolunteerModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       volunteer_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Volunteer/CancelVolunteer: 
*   post: 
*     description: Cancel volunteer request
*     tags:
*     - Volunteer
*     summary: Cancel volunteer request
*     parameters: 
*     - name: Model 
*       description: Enter model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/CancelVolunteerModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Status Cancel Successful.
*       400: 
*         description: Failed to cancel status.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   deleteVolunteerModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       volunteer_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Volunteer/DeleteVolunteer: 
*   post: 
*     description: Delete volunteer
*     tags:
*     - Volunteer
*     summary: Delete volunteer
*     parameters: 
*     - name: Model 
*       description: Enter model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/deleteVolunteerModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Deleted Successful
*       400: 
*         description: Failed to delete data.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GetAllVolunteerModel:
 *     properties:
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Volunteer/GetVolunteers: 
*   post: 
*     description: Get all volunteer details
*     tags:
*     - Volunteer
*     summary: Get all volunteer details
*     parameters: 
*     - name: Model 
*       description: Enter model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetAllVolunteerModel'
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
 *   UpdateVolunteerStatusModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       volunteer_id:
 *         type: integer
 *         required: true
 *       volunteer_status:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Volunteer/UpdateStatus: 
*   put: 
*     description: Update volunteer status.
*     tags:
*     - Volunteer
*     summary: Update volunteer status.
*     parameters: 
*     - name: Model 
*       description: Enter model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UpdateVolunteerStatusModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Status Updated Successful.
*       400: 
*         description: Failed to update status.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   UpdateVolunteerInfoModel:
 *     properties:
 */
/** 
 * @swagger
/Volunteer/UpdateVolunteerInfo: 
*   put: 
*     description: Update volunteer info.
*     tags:
*     - Volunteer
*     summary: Update volunteer info.
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
*       name: token 
*       type: string 
*       required: true
*       description: Enter token 
*     - in: formData
*       name: user_id 
*       type: integer 
*       required: true
*       description: Enter user_id 
*     - in: formData
*       name: start_date 
*       type: string 
*       required: true
*       description: Enter start_date
*     - in: formData
*       name: end_date 
*       type: string 
*       required: true
*       description: Enter end_date  
*     - in: formData
*       name: description 
*       type: string 
*       required: true
*       description: Enter description  
*     - in: formData
*       name: latitude 
*       type: string 
*       required: true
*       description: Enter latitude
*     - in: formData
*       name: longitude 
*       type: string 
*       required: true
*       description: Enter longitude  
*     - in: formData
*       name: address 
*       type: string 
*       required: true
*       description: Enter address 
*     - in: formData
*       name: volunteer_id 
*       type: integer 
*       required: true
*       description: Enter volunteer_id 
*     - in: formData
*       name: share_location_flag 
*       type: boolean 
*       required: true
*       description: Enter share_location_flag 
*       schema: 
*          $ref: '#/definitions/UpdateVolunteerInfoModel'
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
*         description: start_date cannot be greater than end_date/start_date cannot be less than current_date.
*       500:
*         description: Internal server error. 
*   
*/

//volunteer_category
/** 
 * @swagger 
 * definitions:
 *   AddVolunteerCategoryModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       category_name:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Volunteer/AddCategory: 
*   post: 
*     description: Add volunteer category.
*     tags:
*     - Volunteer
*     summary: Add volunteer category.
*     parameters: 
*     - name: Model 
*       description:  Add volunteer category.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AddVolunteerCategoryModel'
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Data Inserted successful.
*       400: 
*         description: Failed to insert data.
*       401: 
*         description: Failed to authenticate token.
*       403: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GetVolunteerCategoryModel:
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
/Volunteer/GetCategory: 
*   post: 
*     description: Get volunteer category.
*     tags:
*     - Volunteer
*     summary: Get volunteer category.
*     parameters: 
*     - name: Model 
*       description: Get volunteer category.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetVolunteerCategoryModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful.
*       401: 
*         description: Failed to authenticate token.
*       404: 
*         description: Data Not Found
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   UpdateVolunteerCategoryModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       volunteer_cat_id:
 *         type: integer
 *         required: true
 *       category_name:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Volunteer/UpdateCategory: 
*   put: 
*     description: Update volunteer category.
*     tags:
*     - Volunteer
*     summary: Update volunteer category.
*     parameters: 
*     - name: Model 
*       description: Enter model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UpdateVolunteerCategoryModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Updated Successful
*       400: 
*         description:Failed to update data.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   DeleteVolunteerCategoryModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       volunteer_cat_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Volunteer/DeleteCategory: 
*   post: 
*     description: Delete volunteer category.
*     tags:
*     - Volunteer
*     summary:  Delete volunteer category.
*     parameters: 
*     - name: Model 
*       description:  Delete volunteer category.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteVolunteerCategoryModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Deleted Successful
*       400: 
*         description: Failed to delete data
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   VolunteerFormModel:
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
/Volunteer/VolunteerForm: 
*   post: 
*     description: Show volunteer form details.
*     tags:
*     - Volunteer
*     summary: Show volunteer form details.
*     parameters: 
*     - name: Model 
*       description: Show volunteer form details.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/VolunteerFormModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful
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
 *   MostTrendingVolunteerModel:
 *     properties:
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Volunteer/MostTrending: 
*   post: 
*     description: Most Trending volunteer details.
*     tags:
*     - Volunteer
*     summary: Most Trending volunteer details.
*     parameters: 
*     - name: Model 
*       description: Enter model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/MostTrendingVolunteerModel'
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
 *   MostDiscussVolunteerModel:
 *     properties:
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Volunteer/MostDiscussed: 
*   post: 
*     description: Most discuss volunteer details.
*     tags:
*     - Volunteer
*     summary: Most discuss volunteer details.
*     parameters: 
*     - name: Model 
*       description: Enter model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/MostDiscussVolunteerModel'
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
 *   GetVolunteerByIdModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       volunteer_id:
 *         type: integer
 *         required: true
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Volunteer/GetVolunteerById: 
*   post: 
*     description: Volunteer ID details.
*     tags:
*     - Volunteer
*     summary: Volunteer ID details.
*     parameters: 
*     - name: Model 
*       description: Enter model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetVolunteerByIdModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful
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
 *   AddVolunteerCommentModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       comment:
 *         type: string
 *         required: true
 *       volunteer_id:
 *         type: integer
 *         required: true
 *      
 */
/** 
 * @swagger
/Volunteer/AddComment: 
*   post: 
*     description: Most discuss volunteer details.
*     tags:
*     - Volunteer
*     summary:  Most discuss volunteer details.
*     parameters: 
*     - name: Model 
*       description: Enter model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AddVolunteerCommentModel'
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Comment Added Successful.
*       400: 
*         description: Failed to add comment.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/


/** 
 * @swagger 
 * definitions:
 *   DeleteVolunteerCommentModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       volunteer_id:
 *         type: integer
 *         required: true
 *      
 */
/** 
 * @swagger
/Volunteer/DeleteComment: 
*   post: 
*     description: Deletes the volunteer's comments.
*     tags:
*     - Volunteer
*     summary: Deletes the volunteer's comments.
*     parameters: 
*     - name: Model 
*       description: Deletes the volunteer's comments.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteVolunteerCommentModel'
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Comment Deleted successful.
*       400: 
*         description: failed to delete comment.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GetAdminVolunteerModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *      
 */
/** 
 * @swagger
/Volunteer/GetVolunteer: 
*   post: 
*     description: Get Volunteer Detail List.
*     tags:
*     - Volunteer
*     summary: Get Volunteer Detail List.
*     parameters: 
*     - name: Model 
*       description: Get Volunteer Detail List.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetAdminVolunteerModel'
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
 *   SearchVolunteerModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       search_text:
 *         type: string
 *         required: true
 *      
 */
/** 
 * @swagger
/Volunteer/Search: 
*   post: 
*     description: Search volunteer data.
*     tags:
*     - Volunteer
*     summary: Search volunteer data.
*     parameters: 
*     - name: Model 
*       description: Search volunteer data.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/SearchVolunteerModel'
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