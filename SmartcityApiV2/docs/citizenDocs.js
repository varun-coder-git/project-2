
/** 
 * @swagger 
 * definitions:
 *   GetCitizenCountModel:
 *     properties:
 *       user_Id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Citizen/GetCitizenCount: 
*   post: 
*     description: Get the Citizen Count
*     tags:
*     - Citizen
*     summary: Get the Citizen Count
*     parameters: 
*     - name: Model 
*       description: Get the Citizen Count
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetCitizenCountModel'
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
