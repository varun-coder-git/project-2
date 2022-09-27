/** 
 * @swagger 
 * definitions:
 *   GetFacilityTypeModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/FacilityType/GetFacilityType: 
*   post: 
*     description: Get Facility Type.
*     tags:
*     - FacilityType
*     summary: Get Facility Type.
*     parameters: 
*     - name: Model 
*       description: Get Facility Type.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetFacilityTypeModel'
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
 *   AddFacilityTypeModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       name:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/FacilityType/RegisterFacilityType: 
*   put: 
*     description: Register Facility Type.
*     tags:
*     - FacilityType
*     summary: Register Facility Type.
*     parameters: 
*     - name: Model 
*       description: Register Facility Type.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AddFacilityTypeModel'
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Data Inserted Successful.
*       400: 
*         description: Failed to insert data.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   UpdateFacilityTypeModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       location_category_id:
 *         type: integer
 *         required: true
 *       name:
 *         type: string
 *         required: true
 *       location_id:
 *         type: integer
 *         required: true
 *       latitude:
 *         type: string
 *         required: true
 *       longitude:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/FacilityType/UpdateFacilityType: 
*   put: 
*     description: Update Facility Type.
*     tags:
*     - FacilityType
*     summary: Update Facility Type.
*     parameters: 
*     - name: Model 
*       description: Update Facility Type.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UpdateFacilityTypeModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Updated Successfully.
*       400: 
*         description: Failed to update data.
*       401: 
*         description: Failed to authenticate token.
*       500:
*         description: Internal server error. 
*   
*/

/** 
 * @swagger 
 * definitions:
 *   DeleteFacilityTypeModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       location_category_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/FacilityType/DeleteFacilityType: 
*   post: 
*     description: Delete Facility Type.
*     tags:
*     - FacilityType
*     summary: Delete Facility Type.
*     parameters: 
*     - name: Model 
*       description: Delete Facility Type.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteFacilityTypeModel'
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
*         description: Internal server error. 
*   
*/