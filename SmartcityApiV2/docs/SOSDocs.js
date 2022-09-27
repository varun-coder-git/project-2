
//SOS API

/** 
 * @swagger 
 * definitions:
 *   SOSModel:
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
/SOS/SOS: 
*   post: 
*     description: Get SOS.
*     tags:
*     - SOS
*     summary: Get SOS.
*     parameters: 
*     - name: Model 
*       description: Get SOS.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/SOSModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: SOS Send Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to send SOS.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*   
*/