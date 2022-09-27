/** 
 * @swagger 
 * definitions:
 *   GetFacilityModel:
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
/Facility/GetFacility: 
*   post: 
*     description: Get Facility List.
*     tags:
*     - Facility
*     summary: Get Facility List.
*     parameters: 
*     - name: Model 
*       description: Get Facility List.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetFacilityModel'
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
 *   UpdateFacilityModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *         description: Enter type.
 *       token:
 *         type: string
 *         required: true
 *         description: Enter token.
 *       location_id:
 *         type: integer
 *         required: true
 *         description: Enter location_id.
 *       location_category_id:
 *         type: integer
 *         required: true
 *         description: Enter location_category_id.
 *       name:
 *         type: string
 *         required: true
 *         description: Enter name.
 *       description:
 *         type: string
 *         description: Enter description.
 *       address:
 *         type: string
 *         description: Enter address.
 *       location:
 *         type: string
 *         description: Enter location.
 *       type: 
 *         type: string
 *         required: true
 *         description: Enter type.
 *       longitude:
 *         type: string
 *         required: true
 *         description: Enter longitude.
 *       latitude:
 *         type: string
 *         required: true
 *         description: Enter latitude.
 */
/** 
 * @swagger
/Facility/UpdateFacility: 
*   put: 
*     description: Updates Facility.
*     tags:
*     - Facility
*     summary: Updates Facility.
*     parameters: 
*     - name: Model 
*       description:  Updates Facility.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/UpdateFacilityModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Updated Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to update data.
*       403: 
*         description: Duplicate Data Found.
*       500:
*         description: Internal server error. 
*   
*/


/** 
 * @swagger 
 * definitions:
 *   NewFacilityModel:
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
 *       longitude:
 *         type: string
 *         required: true
 *       latitude:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/Facility/RegisterFacility: 
*   put: 
*     description: Add new facility/location.
*     tags:
*     - Facility
*     summary: Add new facility/location.
*     parameters: 
*     - name: Model 
*       description: Add new facility/location.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/NewFacilityModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Inserted Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to insert data.
*       403: 
*         description: Duplicate Data Found.
*       500:
*         description: Internal server error.  
*   
*/

/** 
 * @swagger 
 * definitions:
 *   DeleteFacilityModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       location_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Facility/DeleteFacility: 
*   post: 
*     description: Delete location/facility.
*     tags:
*     - Facility
*     summary: Delete location/facility.
*     parameters: 
*     - name: Model 
*       description: Delete location/facility.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteFacilityModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Deleted Successful.
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
 *   FacilityCountModel:
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
/Facility/GetFacilityCount: 
*   post: 
*     description: Get Facility count.
*     tags:
*     - Facility
*     summary: Get Facility count.
*     parameters: 
*     - name: Model 
*       description: Get Facility count.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/FacilityCountModel'
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
 *   FacilityCategoryModel:
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
/Facility/GetFacilityCategory: 
*   post: 
*     description: Get Facility Category.
*     tags:
*     - Facility
*     summary: Get Facility Category. 
*     parameters: 
*     - name: Model 
*       description: Get Facility Category.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/FacilityCategoryModel'
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
 *   GetFacilityByIdModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       location_id:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/Facility/GetFacilityById: 
*   post: 
*     description: Get Facility By ID.
*     tags:
*     - Facility
*     summary: Get Facility By ID.
*     parameters: 
*     - name: Model 
*       description: Get Facility By ID.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetFacilityByIdModel'
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