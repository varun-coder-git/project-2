
/** 
 * @swagger 
 * definitions:
 *   GetNotificationModel:
 *     properties:
 *       user_id:
 *         type: integer
 *       token:
 *         type: string
 */
/** 
  * @swagger
 /Notification/Notification: 
 *   post: 
 *     description: Get notifications.
 *     tags:
 *     - Notification
 *     summary: Get notifications.
 *     parameters: 
 *     - name: Model 
 *       description: Get notifications.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/GetNotificationModel'
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
 *   
 */