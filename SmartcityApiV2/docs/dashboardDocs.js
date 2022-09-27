/** 
 * @swagger 
 * definitions:
 *   GetDashboardModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 * 
 */
/** 
 * @swagger
/Dashboard/Dashboard: 
*   post: 
*     description: Get complaint and incident location details.
*     tags:
*     - Donut
*     summary: Get complaint and incident location details.
*     parameters: 
*     - name: Model 
*       description:  Get complaint and incident location details.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetDashboardModel'
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