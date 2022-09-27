// Incident Router
/** 
 * @swagger 
 * definitions:
 *   GetIncidentModel:
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
/Incident/GetIncidents: 
*   post: 
*     description: Get All Incident Report
*     tags:
*     - Incident
*     summary: Get All Incident Report
*     parameters: 
*     - name: Model 
*       description: Get All Incident Report
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetIncidentModel'
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
*/

/** 
 * @swagger 
 * definitions:
 *   GetIncidentByIdModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       incident_id:
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
/Incident/GetIncidentById: 
*   post: 
*     description: Get All Incident Report By Id
*     tags:
*     - Incident
*     summary: Get All Incident Report By Id
*     parameters: 
*     - name: Model 
*       description: Get All Incident Report By Id
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetIncidentByIdModel'
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
*         description: Internal server error     
*/


/** 
 * @swagger 
 * definitions:
 *   GetIncidentCategoryModel:
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
/Incident/GetCategory: 
*   post: 
*     description: Get All Incident Category
*     tags:
*     - Incident
*     summary: Get All Incident Category
*     parameters: 
*     - name: Model 
*       description: Get All Incident Category
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetIncidentCategoryModel'
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
*         description: Internal server error     
*/

/** 
 * @swagger 
 * definitions:
 *   GetIncidentStatusModel:
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
/Incident/GetStatus: 
*   post: 
*     description: Get All Incident Status Category
*     tags:
*     - Incident
*     summary: Get All Incident Status Category
*     parameters: 
*     - name: Model 
*       description: Get All Incident Status Category
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetIncidentStatusModel'
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
*         description: Internal server error     
*/


/** 
 * @swagger 
 * definitions:
 *   DeleteIncidentModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       incident_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Incident/DeleteIncident: 
*   post: 
*     description: Delete incident report.
*     tags:
*     - Incident
*     summary: Delete incident report.
*     parameters: 
*     - name: Model 
*       description: Delete incident report.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteIncidentModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Comment deleted successful
*       401: 
*         description: Failed to authenticate token.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error     
*/

/** 
 * @swagger 
 * definitions:
 *   UpdateIncidentStatusModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       incident_id:
 *         type: integer
 *         required: true
 *       incident_status_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Incident/UpdateStatus: 
*   put: 
*     description: Update Incident Status
*     tags:
*     - Incident
*     summary:  Update Incident Status
*     parameters: 
*     - name: Model 
*       description: Update Incident Status
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UpdateIncidentStatusModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Updated successful
*       401: 
*         description: Failed to authenticate token.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error     
*/


/** 
 * @swagger 
 * definitions:
 *   AddIncidentCommentModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       incident_id:
 *         type: integer
 *         required: true
 *       comment:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Incident/AddIncidentComment: 
*   put: 
*     description: Add comment on incident.
*     tags:
*     - Incident
*     summary: Add comment on incident.
*     parameters: 
*     - name: Model 
*       description: Add comment on incident.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AddIncidentCommentModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Comment Added Successful.
*       401: 
*         description: Failed to authenticate token.
*       404:
*         description: Failed to add comment.
*       500:
*         description: Internal server error     
*/


/** 
 * @swagger 
 * definitions:
 *   DeleteIncidentCommentModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       incident_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Incident/DeleteIncidentComment: 
*   post: 
*     description: Delete comment.
*     tags:
*     - Incident
*     summary: Delete comment.
*     parameters: 
*     - name: Model 
*       description: Delete comment.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteIncidentCommentModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description:Comment deleted successful.
*       401: 
*         description: Failed to authenticate token.
*       400:
*         description: Failed to delete comment
*       500:
*         description: Internal server error     
*/

/** 
* @swagger 
* definitions:
*   CreateIncidentModel:
*     properties:
*
*/
/** 
* @swagger
/Incident/RegisterIncident: 
*   put: 
*     description: Register incident
*     tags:
*     - Incident
*     summary: Register incident
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
*       name: incident_cat_id 
*       type: integer 
*       required: true
*       description: Enter incident_cat_id
*     - in: formData
*       name: description 
*       type: string 
*       required: true
*       description: Enter description  
*     - in: formData
*       name: is_anonymous 
*       type: string 
*       required: true
*       description: Enter is_anonymous  
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
*       schema: 
*          $ref: '#/definitions/CreateIncidentModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Incident Added Successful.
*       401: 
*         description: Failed to authenticate token.
*       400:
*         description: Failed to register incident.
*       500:
*         description: Internal server error.     
*/

/** 
* @swagger 
* definitions:
*   SearchIncidentModel:
*     properties:
*       user_id:
*         type: integer
*         required: true
*       token:
*         type: string
*         required: true
*       incident_cat_id:
*         type: integer
*       incident_status_id:
*         type: integer
*       incident_id:
*         type: integer
*/
/** 
* @swagger
/Incident/Search: 
*   post: 
*     description: Search incident
*     tags:
*     - Incident
*     summary: Search incident
*     parameters: 
*     - name: Model 
*       description: Search incident
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/SearchIncidentModel'
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
*         description: Internal server error     
*/

/** 
* @swagger 
* definitions:
*   MyIncidentStatusModel:
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
/Incident/IncidentStatus: 
*   post: 
*     description: Incident Status
*     tags:
*     - Incident
*     summary: Incident Status
*     parameters: 
*     - name: Model 
*       description: Incident Status
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/MyIncidentStatusModel'
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
*         description: Internal server error     
*/

/** 
 * @swagger 
 * definitions:
 *   GetMyIncidentFeedbackModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       incident_id:
 *         type: integer
 *         required: true
 *       feedback_rating:
 *         type: integer
 *         required: false
 *       feedback_description:
 *         type: string
 *         required: false
 */
/** 
  * @swagger
/Incident/UpdateIncidentFeedback: 
*   post: 
*     description: Incident Feedback
*     tags:
*     - Incident
*     summary: Incident Feedback
*     parameters: 
*     - name: Model 
*       description: Incident Feedback
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetMyIncidentFeedbackModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Feedback Updated Successful.
*       400: 
*         description: Failed to update data.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/