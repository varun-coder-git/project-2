// Complaint routes

/** 
 * @swagger
/Complaint/RegisterComplaint: 
*   put: 
*     description: Create complaint.
*     tags:
*     - Complaints
*     summary: Register complaint.
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
*       name: complaint_cat_id 
*       type: string 
*       required: true
*       description: Enter complaint_cat_id
*     - in: formData
*       name: complaint 
*       type: string 
*       required: true
*       description: Enter complaint
*     - in: formData
*       name: ward_id 
*       type: string 
*       required: true
*       description: Enter ward_id  
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
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Complaint Registered Successful.
*       400: 
*         description: Something went wrong/File not uploaded!!/Failed to register complaint.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error.
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GetComplaintModel:
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
/Complaint/GetComplaint: 
*   post: 
*     description: Get all the complaints
*     tags:
*     - Complaints
*     summary: Get all the complaints
*     parameters: 
*     - name: Model 
*       description: Get all the complaints
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetComplaintModel'
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
 *   GetComplaintSummaryModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       complaint_id:
 *         type: integer
 *         required: true
 *       offset:
 *         type: integer
 *         required: true
 *       is_admin:
 *         type: boolean
 *         required: true
 */
/** 
 * @swagger
/Complaint/GetComplaintSummaryById: 
*   post: 
*     description: Get the details of complaints
*     tags:
*     - Complaints
*     summary: Get the details of complaints
*     parameters: 
*     - name: Model 
*       description: Get the details of complaints
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetComplaintSummaryModel'
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
 *   GetComplaintCategoryModel:
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
/Complaint/Category: 
*   post: 
*     description: Get complaint category.
*     tags:
*     - Complaints
*     summary: Get complaint category.
*     parameters: 
*     - name: Model 
*       description: Get complaint category.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetComplaintCategoryModel'
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
 *   UpdateComplaintStatusModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       complaint_id:
 *         type: integer
 *         required: true
 *       complaint_status_id:
 *         type: integer
 *         required: true
 *       is_admin:
 *         type: boolean
 *         required: true
 */
/** 
 * @swagger
/Complaint/UpdateStatus: 
*   put: 
*     description: Update the status of Complaints.
*     tags:
*     - Complaints
*     summary: Update the status of Complaints.
*     parameters: 
*     - name: Model 
*       description: Update the status of Complaints.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UpdateComplaintStatusModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Updated Successful.
*       400: 
*         description: Failed to Update data.
*       401: 
*         description: Failed to authenticate token.
*       403: 
*         description: 7 days limit exceeded, you can't reopen now.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GetComplaintStatusModel:
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
/Complaint/GetComplaintStatus: 
*   post: 
*     description: Get the Status of complaints
*     tags:
*     - Complaints
*     summary: Get the Status of complaints
*     parameters: 
*     - name: Model 
*       description:  Get the Status of complaints
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetComplaintStatusModel'
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
 *   SearchComplaintModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       complaint_cat_id:
 *         type: integer
 *       complaint_status_id:
 *         type: integer
 *       thread_id:
 *         type: integer
 */
/** 
 * @swagger
/Complaint/Search: 
*   post: 
*     description: Search complaints
*     tags:
*     - Complaints
*     summary: Search complaints
*     parameters: 
*     - name: Model 
*       description: Search complaints
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/SearchComplaintModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful
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
 *   MyComplaintStatusModel:
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
/Complaint/ComplaintStatus: 
*   post: 
*     description: Gets the status of the Complaint
*     tags:
*     - Complaints
*     summary: Gets the status of the Complaint
*     parameters: 
*     - name: Model 
*       description: Gets the status of the Complaint
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/MyComplaintStatusModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful
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
 *   DeleteComplaintModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       complaint_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Complaint/DeleteComplaint: 
*   post: 
*     description: Delete complaint.
*     tags:
*     - Complaints
*     summary: Delete complaint.
*     parameters: 
*     - name: Model 
*       description: Delete the complaint.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteComplaintModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Complaint Deleted Successful.
*       400: 
*         description: Failed to delete complaint.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error.
*   
*/

/** 
 * @swagger 
 * definitions:
 *   AddComplaintModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       comments:
 *         type: string
 *         required: true
 *       thread_id:
 *         type: integer
 *         required: true
 *       complaint_cat_id:
 *          type: integer
 *          required: true
 */
/** 
 * @swagger
/Complaint/AddComment: 
*   put: 
*     description: Add Comments to the Complaint.
*     tags:
*     - Complaints
*     summary: Add Comments to the Complaint.
*     parameters: 
*     - name: Model 
*       description: Add Comments to the Complaint.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AddComplaintModel'
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Comment Added Successfully.
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
 *   complaintModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       comment_thread_id:
 *         type: integer
 *         required: true
 */
/** 
  * @swagger
/Complaint/DeleteComment: 
*   post: 
*     description: Delete Comments of the Complaint.
*     tags:
*     - Complaints
*     summary: Delete Comments of the Complaint.
*     parameters: 
*     - name: Model 
*       description: Delete Comments of the Complaint.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/complaintModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Comment Deleted Successful
*       400: 
*         description: Failed to delete comment
*       401: 
*         description:  Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GetMyComplaintFeedbackModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       thread_id:
 *         type: integer
 *         required: true
 *       feedback_rating:
 *         type: integer
 *       feedback_description:
 *         type: string
 */
/** 
  * @swagger
/Complaint/GetComplaintFeedback: 
*   post: 
*     description: Complaint Feedback
*     tags:
*     - Complaints
*     summary: Complaint Feedback
*     parameters: 
*     - name: Model 
*       description: Complaint Feedback
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetMyComplaintFeedbackModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Feedback Updated Successful
*       400: 
*         description: Failed to update feedback.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/
