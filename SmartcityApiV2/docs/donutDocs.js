/** 
 * @swagger 
 * definitions:
 *   GetDonutDetailsModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       calender_period:
 *         type: integer
 *         required: true
 * 
 */
/** 
 * @swagger
/Donut/DonutDetails: 
*   post: 
*     description: Get Donut Details.
*     tags:
*     - Donut
*     summary: Get Donut Details.
*     parameters: 
*     - name: Model 
*       description: Get Donut Details.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetDonutDetailsModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful.
*       401: 
*         description: Failed to authenticate token.
*       403: 
*         description: Invalid calender input.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error     
*/