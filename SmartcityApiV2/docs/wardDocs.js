
//Wards API

/** 
 * @swagger 
 * definitions:
 *   GetTopWardModel:
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
/Smartcity/GetTopWard: 
*   post: 
*     description: Get Top Performing Ward.
*     tags:
*     - Ward
*     summary: Get Top Performing Ward.
*     parameters: 
*     - name: Model 
*       description: Get Top Performing Ward.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetTopWardModel'
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
 *   GetLessWardModel:
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
/Smartcity/GetLessWard: 
*   post: 
*     description: Get Ward Needs Improvement.
*     tags:
*     - Ward
*     summary: Get Ward Needs Improvement.
*     parameters: 
*     - name: Model 
*       description: Get Ward Needs Improvement.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetLessWardModel'
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
 *   TopWardChartModel:
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
/Smartcity/GetTopWardChart: 
*   post: 
*     description: Get Top Performing Ward.
*     tags:
*     - Ward
*     summary: Get Top Performing Ward.
*     parameters: 
*     - name: Model 
*       description: Get Top Performing Ward.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/TopWardChartModel'
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
 *   LessWardChartModel:
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
/Smartcity/GetLessWardChart: 
*   post: 
*     description: Get Less Performing Ward.
*     tags:
*     - Ward
*     summary: Get Less Performing Ward.
*     parameters: 
*     - name: Model 
*       description: Get Less Performing Ward.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/LessWardChartModel'
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
