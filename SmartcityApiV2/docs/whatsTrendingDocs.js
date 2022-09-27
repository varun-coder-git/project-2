
/** 
 * @swagger 
 * definitions:
 *   whatsTrendingModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       offset:
 *         type: integer
 *         required: true
 * 
 */
/** 
 * @swagger
/WhatsTrending/GetWhatsTrending: 
*   post: 
*     description: Get whats trending data.
*     tags:
*     - Whats Trending 
*     summary: Get whats trending data.
*     parameters: 
*     - name: Model 
*       description: reference model 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/whatsTrendingModel'
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful.
*       404:
*         description: Data Not Found.
*       500:
*         description: Internal server error     
*/