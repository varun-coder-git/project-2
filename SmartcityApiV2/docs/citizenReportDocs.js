/** 
 * @swagger 
 * definitions:
 *   GetCitizenReportModel:
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
/CitizenReport/GetCitizenReport: 
*   post: 
*     description: Get the details of Citizen.
*     tags:
*     - Citizen Report
*     summary: Get the details of Citizen.
*     parameters: 
*     - name: Model 
*       description: Get the details of Citizen.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetCitizenReportModel'
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
 *   GetCitizenByIdReportModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       citizen_user_id: 
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/CitizenReport/GetCitizenById: 
*   post: 
*     description: Get the details of Citizen by id.
*     tags:
*     - Citizen Report
*     summary: Get the details of Citizen by id.
*     parameters: 
*     - name: Model 
*       description: Get the details of Citizen by id.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetCitizenByIdReportModel'
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
 *   DeleteCitizenReportModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       citizen_user_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/CitizenReport/DeleteCitizen: 
*   post: 
*     description: Delete Citizen.
*     tags:
*     - Citizen Report
*     summary: Delete Citizen.
*     parameters: 
*     - name: Model 
*       description: Delete Citizen.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteCitizenReportModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Deleted Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to delete data
*       500:
*         description: Internal server error.
*   
*/