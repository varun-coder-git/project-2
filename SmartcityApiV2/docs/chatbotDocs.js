/** 
 * @swagger 
 * definitions:
 *   GetChatbotReportModel:
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
/Chatbot/GetChatbot: 
*   post: 
*     description: Get the details of chatbot.
*     tags:
*     - Chatbot Report
*     summary: Get the details of chatbot.
*     parameters: 
*     - name: Model 
*       description: Get the details of chatbot.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetChatbotReportModel'
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
 *   DeleteChatbotModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       chatbot_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Chatbot/DeleteChatbot: 
*   post: 
*     description: Delete chatbot data.
*     tags:
*     - Chatbot Report
*     summary: Delete chatbot data.
*     parameters: 
*     - name: Model 
*       description:  Delete chatbot data.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteChatbotModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Chatbot Deleted Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to delete data
*       500:
*         description: Internal server error.
*   
*/

/** 
 * @swagger 
 * definitions:
 *   GetChatbotStatusCategoryModel:
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
/Chatbot/GetStatus: 
*   post: 
*     description: Get the status category.
*     tags:
*     - Chatbot Report
*     summary: Get the status category.
*     parameters: 
*     - name: Model 
*       description:  Get the status category.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetChatbotStatusCategoryModel'
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
 *   UpdateChatbotStatusModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       chatbot_id:
 *         type: integer
 *         required: true
 *       chatbot_status_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Chatbot/UpdateStatus: 
*   put: 
*     description: Update chatbot Status.
*     tags:
*     - Chatbot Report
*     summary: Update chatbot Status.
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UpdateChatbotStatusModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Update Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to update data
*       500:
*         description: Internal server error.
*   
*/


/** 
 * @swagger 
 * definitions:
 *   GetChatbotByIdModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       chatbot_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Chatbot/GetChatbotById: 
*   post: 
*     description: Get Chatbot Data By Id .
*     tags:
*     - Chatbot Report
*     summary: Get Chatbot Data By Id .
*     parameters: 
*     - name: Model 
*       description: Get Chatbot Data By Id .
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetChatbotByIdModel'
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
 *   CreateChatbotModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       concern_query:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Chatbot/RegisterConcern: 
*   put: 
*     description: Register Chatbot Concern.
*     tags:
*     - Chatbot Report
*     summary: Register Concern.
*     parameters: 
*     - name: Model 
*       description: Register Chatbot Concern.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/CreateChatbotModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Concern Register Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to register data.
*       500:
*         description: Internal server error.
*   
*/