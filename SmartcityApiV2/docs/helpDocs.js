
/** 
 * @swagger 
 * definitions:
 *   HelpEmailModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       name:
 *         type: string
 *       email:
 *         type: string
 *         required: true
 *       category:
 *         type: string
 *         required: true
 *       description:
 *         type: string
 *         required: true
 */
/** 
  * @swagger
/Help/HelpEmail: 
*   post: 
*     description: Help Email
*     tags:
*     - Help
*     summary: Help Email
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/HelpEmailModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Mail Sent Successful
*       400: 
*         description: Failed to send email.
 *   
 */
