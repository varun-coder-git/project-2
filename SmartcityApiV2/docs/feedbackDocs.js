/** 
 * @swagger 
 * definitions:
 *   GetFeedbackModel:
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
/Feedback/GetFeedback: 
*   post: 
*     description: Get All Incident Report
*     tags:
*     - Feedback
*     summary: Get All Incident Report
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetFeedbackModel'
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
 *   DeleteFeedbackModel:
 *     properties:
 *       user_id:
 *         type: integer
 *       token:
 *         type: string
 *       feedbackfor:
 *         type: string
 *       feedback_id:
 *         type : integer
 *     required:
 *      - user_id
 *      - token
 *      - feedbackfor
 *      - feedback_id
 * 
 */
/** 
 * @swagger
/Feedback/DeleteFeedback: 
*   post: 
*     description: Delete FeedBack
*     tags:
*     - Feedback
*     summary: Delete FeedBack
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteFeedbackModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Deleted Successful.
*       400:
*         description: Failed to delete data.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error       
*/

/** 
 * @swagger 
 * definitions:
 *   GetFeedbackByIdModel:
 *     properties:
 *       user_id:
 *         type: integer
 *       token:
 *         type: string
 *       feedbackfor:
 *         type: string
 *       feedback_id:
 *         type : integer
 *     required:
 *      - user_id
 *      - token
 *      - feedbackfor
 *      - feedback_id
 * 
 */
/** 
 * @swagger
/Feedback/GetFeedbackById: 
*   post: 
*     description: Get Feedback By Id
*     tags:
*     - Feedback
*     summary: Get Feedback By Id
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetFeedbackByIdModel'
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
