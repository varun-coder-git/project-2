/** 
 * @swagger
/News/RegisterNews: 
*   put: 
*     description: Register News.
*     tags:
*     - News
*     summary: Register News.
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: string
*                 format: binary
*     parameters: 
*     - in: formData
*       name: user_id 
*       type: integer 
*       required: true
*       description: Enter user_id 
*     - in: formData
*       name: token 
*       type: string 
*       required: true
*       description: Enter token 
*     - in: formData
*       name:  title
*       type: string 
*       required: true
*       description: Enter title 
*     - in: formData
*       name: description 
*       type: string 
*       required: true
*       description: Enter description
*     - in: formData
*       name: category_id 
*       type: integer
*       required: true
*       description: Enter category_id
*     - in: formData
*       name: is_breaking 
*       type: boolean 
*       required: false
*       description: Enter is_breaking  
*     - in: formData
*       name: is_hide 
*       type: boolean 
*       required: false
*       description: Enter is_hide  
*     - in: formData
*       name: file
*       type: file 
*       required: false
*       description: Enter file
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: News Register Successful
*       400: 
*         description: Failed to register news
*       401: 
*         description: Failed to authenticate token.
*       402: 
*         description: File not uploaded!!
*       403: 
*         description: File format not supported
*       500:
*         description: Internal server error.
*/

/** 
 * @swagger 
 * definitions:
 *   GetNewsCategoryModel:
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
/News/GetNewsCategory: 
*   post: 
*     description: Get News Category.
*     tags:
*     - News
*     summary: Get News Category.
*     parameters: 
*     - name: Model 
*       description: Get News Category.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetNewsCategoryModel'
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
*/

/** 
 * @swagger 
 * definitions:
 *   GetNewsModel:
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
/News/GetNews: 
*   post: 
*     description: Get News.
*     tags:
*     - News
*     summary: Get News.
*     parameters: 
*     - name: Model 
*       description: Get News.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetNewsModel'
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
*/

/** 
 * @swagger 
 * definitions:
 *   GetNewsByIdModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       ID:
 *         type: integer
 *         required: true
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/News/GetNewsById: 
*   post: 
*     description: Get News By ID.
*     tags:
*     - News
*     summary: Get News By ID.
*     parameters: 
*     - name: Model 
*       description: Get News By ID.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetNewsByIdModel'
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
*/

/** 
 * @swagger 
 * definitions:
 *   AddNewsCommentModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       newsID:
 *         type: integer
 *         required: true
 *       comment:
 *         type: string
 *         required: true
 */
/** 
 * @swagger
/News/AddNewsComment: 
*   post: 
*     description: Add comment on news.
*     tags:
*     - News
*     summary: Add comment on news.
*     parameters: 
*     - name: Model 
*       description: Add comment on news.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/AddNewsCommentModel'
*     produces:
*       - application/json
*     responses:        
*       200: 
*         description: Data Added Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to add data.
*       500:
*         description: Internal server error.
*/

/** 
 * @swagger 
 * definitions:
 *   DeleteNewsCommentModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       commentID:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/News/DeleteNewsComment: 
*   post: 
*     description: delete comment of news.
*     tags:
*     - News
*     summary: delete comment of news.
*     parameters: 
*     - name: Model 
*       description: delete comment of news.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteNewsCommentModel'
*     produces:
*       - application/json
*     responses:        
*       200: 
*         description: Data Deleted Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to delete data.
*       500:
*         description: Internal server error.
*/

/** 
 * @swagger 
 * definitions:
 *   DeleteNewsModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       ID:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/News/DeleteNews: 
*   post: 
*     description: delete news.
*     tags:
*     - News
*     summary: delete news.
*     parameters: 
*     - name: Model 
*       description: delete news.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/DeleteNewsModel'
*     produces:
*       - application/json
*     responses:        
*       200: 
*         description: Data Deleted Successful.
*       401: 
*         description: Failed to authenticate token.
*       400: 
*         description: Failed to delete data.
*       500:
*         description: Internal server error.
*/



/** 
 * @swagger
/News/BreakingNews: 
*   get: 
*     description: Get Breaking News.
*     tags:
*     - News
*     summary: Get Breaking News.
*     produces:
*       - application/json
*     responses:        
*       200: 
*         description: Data Found Successful.
*       404: 
*         description: Data Not Found.
*       500:
*         description: Internal server error.
*/

/** 
 * @swagger 
 * definitions:
 *   GetNewsOCMModel:
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
 */
/** 
 * @swagger
/News/GetNewsOCM: 
*   post: 
*     description: Get News OCM.
*     tags:
*     - News
*     summary: Get News OCM.
*     parameters: 
*     - name: Model 
*       description: Get News OCM.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetNewsOCMModel'
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
*/

/** 
 * @swagger 
 * definitions:
 *   EditNewsByIdModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       ID:
 *         type: integer
 *         required: true
 *       offset:
 *         type: integer
 *         required: true
 *
 *
 */
/** 
 * @swagger
/News/EditNewsById: 
*   post: 
*     description: Edit News By Id
*     tags:
*     - News
*     summary: Edit News By Id
*     parameters: 
*     - name: Model 
*       description: Edit News By Id
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/EditNewsByIdModel'
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
*/

/** 
 * @swagger
/News/updateNews: 
*   put: 
*     description: Update News .
*     tags:
*     - News
*     summary: Update News.
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: string
*                 format: binary
*     parameters: 
*     - in: formData
*       name: user_id 
*       type: integer 
*       required: true
*       description: Enter user_id 
*     - in: formData
*       name: token 
*       type: string 
*       required: true
*       description: Enter token 
*     - in: formData
*       name: news_id 
*       type: integer 
*       required: true
*       description: Enter news_id 
*     - in: formData
*       name:  title
*       type: string 
*       required: true
*       description: Enter title 
*     - in: formData
*       name: description 
*       type: string 
*       required: true
*       description: Enter description
*     - in: formData
*       name: category_id 
*       type: integer
*       required: true
*       description: Enter category_id
*     - in: formData
*       name: is_breaking 
*       type: boolean 
*       required: false
*       description: Enter is_breaking  
*     - in: formData
*       name: is_hide 
*       type: boolean 
*       required: false
*       description: Enter is_hide  
*     - in: formData
*       name: isURL 
*       type: boolean 
*       required: false
*       description: Enter isURL  
*     - in: formData
*       name: file
*       type: file 
*       required: false
*       description: Enter file
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: News Register Successful
*       400: 
*         description: Failed to register news
*       401: 
*         description: Failed to authenticate token.
*       402: 
*         description: File not uploaded!!
*       403: 
*         description: File format not supported
*       500:
*         description: Internal server error.
*/

/** 
 * @swagger 
 * definitions:
 *   GetNewsByIdOCMModel:
 *     properties:
 *       user_id:
 *         type: integer
 *         required: true
 *       token:
 *         type: string
 *         required: true
 *       ID:
 *         type: integer
 *         required: true
 *       offset:
 *         type: integer
 *         required: true
 */
/** 
 * @swagger
/News/GetNewsByIdOCM: 
*   post: 
*     description: Get News By ID.
*     tags:
*     - News
*     summary: Get News By ID.
*     parameters: 
*     - name: Model 
*       description: Get News By ID.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/GetNewsByIdOCMModel'
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
*/
