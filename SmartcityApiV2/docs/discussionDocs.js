//discussion route

/** 
 * @swagger 
 * definitions:
 *   GetAllDiscussionModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Discussion/GetAllDiscussion: 
*   post: 
*     description: Get All Discussion.
*     tags:
*     - Discussion
*     parameters: 
*     - name: model
*       type: integer 
*       description: Get All Discussion.
*       in: body
*       required: false
*       schema: 
*          $ref: '#/definitions/GetAllDiscussionModel'
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
 *   AddNewDiscussionModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       discussion_cat_id:
 *         type: integer
 *         required: true
 *       subject:
 *         type: string
 *         required: true
 *       body:
 *         type: string
 *       date:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Discussion/RegisterDiscussion: 
*   put: 
*     description: Add new discussion.
*     tags:
*     - Discussion
*     parameters: 
*     - name: Model 
*       description: Add new discussion.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AddNewDiscussionModel'
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Data Inserted Successful.
*       400: 
*         description: Failed to insert data.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   UpdateDiscussionModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       discussion_cat_id:
 *         type: integer
 *         required: true
 *       subject:
 *         type: string
 *         required: true
 *       body:
 *         type: string
 *       date:
 *         type: string
 *         required: true
 *       thread_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Discussion/UpdateDiscussion: 
*   post: 
*     description: Update discussion.
*     tags:
*     - Discussion
*     parameters: 
*     - name: Model 
*       description: Update discussion.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UpdateDiscussionModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Updated Successful.
*       400: 
*         description: Failed to update data
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/