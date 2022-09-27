
/** 
 * @swagger 
 * definitions:
 *   GetIdeasModel:
 *     properties:
 *       recordId:
 *         type: integer
 *         minimum: 1  
 *       offset:
 *         type: integer
 *       is_admin:
 *         type: boolean
 */
/** 
 * @swagger 
 * definitions:
 *   GetIdeasByUserIDModel:
 *     properties:
 *       token:
 *         type: string    
 *       user_id:
 *         type: integer   
 *       recordId:
 *         type: integer 
 *         minimum: 1 
 *       offset:
 *         type: integer
 */
/** 
 * @swagger 
 * definitions:
 *   CreateIdeaModel:
 *     properties:
   
 */
/** 
 * @swagger 
 * definitions:
 *   UpdateIdeaModel:
 *     properties:
 *       token:
 *         type: string    
 *       user_Id:
 *         type: integer   
 *       idea_cat_id:
 *         type: integer
 *         required: true
 *         minimum: 1
 *         maximum: 15         
 *       title:
 *         type: string
 *         maximum: 250 
 *         required: true 
 *       description:
 *         type: string
 *         maximum: 500
 *         required: true
 *       thread_id:
 *         type: integer    
 *       latitude:
 *         type: string
 *         required: true
 *       longitude:
 *         type: string
 *         required: true
 *       address:
 *         type: string
 *         required: true     
 */
/** 
 * @swagger 
 * definitions:
 *   DeleteIdeaModel:
 *     properties:
 *       token:
 *         type: string    
 *       user_Id:
 *         type: integer   
 *       thread_id:
 *         type: integer 
 *         required: true         
 */
/** 
 * @swagger 
 * definitions:
 *   AddCommentIdeaModel:
 *     properties:
 *       token:
 *         type: string    
 *       user_Id:
 *         type: integer
 *       idea_cat_id:
 *          type: integer
 *          required: true
 *          minimum: 1
 *          maximum: 15  
 *       description:
 *         type: string
 *         maximum: 500
 *         required: true
 *       parent_thread_id:
 *         type: integer 
 *         required: true 
 *                  
 */
/** 
 * @swagger 
 * definitions:
 *   DeleteCommentIdeaModel:
 *     properties:
 *       token:
 *         type: string    
 *       user_id:
 *         type: integer
 *       response_Id:
 *         type: integer 
 *         required: true 
 *                  
 */
 

 /** 
  * @swagger
 /Ideas/GetIdeas: 
 *   post: 
 *     description: Get a list of all ideas.
 *     tags:
 *       - Ideas  
 *     summary: Get a list of all ideas. 
 *     parameters: 
 *     - name: Model 
 *       description: Get a list of all ideas.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/GetIdeasModel'
 *     produces:
 *       - application/json
 *     responses:  
 *       200: 
 *         description: Data Found Successful. 
 *       404:
 *         description: Data Not Found.  
 *       500:
 *         description: Internal server error.
 *   
 */  

/** 
 * @swagger 
 * definitions:
 *   GetMostDiscussedIdeasModel:
 *     properties:  
 *       offset:
 *         type: integer
 *       recordId:
 *         type: integer
 *                  
 */
/** 
  * @swagger
 /Ideas/GetMostDiscussedIdeas: 
 *   post: 
 *     description: Get a list of trending ideas.
 *     tags:
 *       - Ideas  
 *     summary: Get a list of trending ideas.
 *     parameters: 
 *     - name: Model 
 *       description: Get a list of trending ideas.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/GetMostDiscussedIdeasModel'
 *     produces:
 *       - application/json
 *     responses:  
 *       200: 
 *         description: Data Found Successful. 
 *       404:
 *         description: Data Not Found.  
 *       500:
 *         description: Internal server error. 
 *   
 */  

/** 
 * @swagger 
 * definitions:
 *   GetTrendingIdeasModel:
 *     properties:  
 *       offset:
 *         type: integer
 *       recordId:
 *         type: integer
 *                  
 */
/** 
  * @swagger
 /Ideas/GetTrendingIdeas: 
 *   post: 
 *     description: Get a list of trending ideas.
 *     tags:
 *       - Ideas  
 *     summary: Get a list of trending ideas.
 *     parameters: 
 *     - name: Model 
 *       description: Get a list of trending ideas.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/GetTrendingIdeasModel'
 *     produces:
 *       - application/json
 *     responses:  
 *       200: 
 *         description: Data Found Successful. 
 *       404:
 *         description: Data Not Found.  
 *       500:
 *         description: Internal server error.  
 *   
 */  


/** 
  * @swagger
 /Ideas/GetIdeasByUser: 
 *   post: 
 *     description: Get all the ideas by user ID.
 *     tags:
 *       - Ideas  
 *     summary: Get all the ideas by user ID.
 *     parameters: 
 *     - name: Model 
 *       description: Get all the ideas by user ID.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/GetIdeasByUserIDModel'
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
 *   GetIdeaSummaryModel:
 *     properties:  
 *       user_id:
 *         type: integer
 *       token:
 *         type: string
 *                  
 */
/** 
  * @swagger
 /Ideas/GetIdeaSummary/{id}/{is_admin}: 
 *   post: 
 *     description: Get all the ideas by user ID
 *     tags:
 *       - Ideas  
 *     summary: Get all the ideas by user ID
 *     parameters: 
 *     - name: id 
 *       description: Idea Id 
 *       in: path 
 *       required: true
 *     - name: is_admin
 *       description: is_admin 
 *       in: path
 *       required: true
 *     - name: body
 *       description: body 
 *       in: body
 *       required: true
 *       schema: 
 *         $ref: '#/definitions/GetIdeaSummaryModel'
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
 /Ideas/CreateIdea: 
 *   post: 
 *     description: Create a new idea.
 *     consumes:
 *        - multipart/form-data
 *     tags:
 *       - Ideas  
 *     summary: Create a new idea.
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
 *       name: token 
 *       type: string 
 *       required: true
 *       description: Enter token.
 *     - in: formData
 *       name: user_Id 
 *       type: integer 
 *       required: true
 *       description: Enter user_Id.
 *     - in: formData
 *       name: idea_cat_id 
 *       type: integer 
 *       required: true
 *       description: Enter idea_cat_id.
 *     - in: formData
 *       name:  title
 *       type: string 
 *       required: true
 *       description: Enter title.
 *     - in: formData
 *       name: description 
 *       type: string 
 *       required: true
 *       description: Enter description. 
 *     - in: formData
 *       name: latitude 
 *       type: string 
 *       required: true
 *       description: reference latitude
 *     - in: formData
 *       name:  longitude
 *       type: string 
 *       required: true
 *       description: Enter longitude.
 *     - in: formData
 *       name: address 
 *       type: string 
 *       required: true
 *       description: Enter address. 
 *     - in: formData
 *       name: share_location_flag 
 *       type: boolean 
 *       required: true
 *       description: Enter share_location_flag. 
 *     - in: formData
 *       name: file1
 *       type: file 
 *       required: false
 *       description: Enter file1.
 *     - in: formData
 *       name: file2 
 *       type: file 
 *       required: false
 *       description: Enter file2.
 *     - in: formData
 *       name: file3 
 *       type: file 
 *       required: false
 *       description: Enter token.
 *       schema: 
 *          $ref: '#/definitions/CreateIdeaModel'
 *     produces:
 *       - application/json
 *     responses:  
 *       201: 
 *         description: Idea Added Successful  
 *       400:
 *         description: Failed to create idea.
 *       401: 
 *         description: Failed to authenticate token.
 *       403:
 *         description: File not uploaded!!.
 *       500:
 *         description: Internal server error.
 *   
 */ 


 /** 
  * @swagger
 /Ideas/UpdateIdea: 
 *   put: 
 *     description: Update a idea.
 *     tags:
 *       - Ideas  
 *     summary: Update a idea.
 *     parameters: 
 *     - name: Model 
 *       description: Update a idea.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/UpdateIdeaModel'
 *     produces:
 *       - application/json
 *     responses:  
 *       200: 
 *         description: Data Update Successful.
 *       401: 
 *         description: Failed to authenticate token.
 *       403:
 *         description: Failed to update data.
 *       500:
 *         description: Internal server error.
 *   
 */ 


 /** 
  * @swagger
 /Ideas/DeleteIdea: 
 *   post: 
 *     description: Delete an idea.
 *     tags:
 *       - Ideas  
 *     summary: Delete an idea.
 *     parameters: 
 *     - name: Model 
 *       description: Delete an idea.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/DeleteIdeaModel'
 *     produces:
 *       - application/json
 *     responses:  
 *       201: 
 *         description: Data Deleted Successful.
 *       400:
 *         description: Failed to delete idea.
 *       401: 
 *         description: Failed to authenticate token.
 *       500:
 *         description: Internal server error.
 */ 


 /** 
  * @swagger
 /Ideas/AddIdeaResponse: 
 *   post: 
 *     description: Add a comment to idea.
 *     tags:
 *       - Ideas  
 *     summary: Add a comment to idea.
 *     parameters: 
 *     - name: Model 
 *       description: Add a comment to idea.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/AddCommentIdeaModel'
 *     produces:
 *       - application/json
 *     responses:  
 *       200: 
 *         description: Response Added Successful.
 *       400:
 *         description: Failed to add response.
 *       401: 
 *         description: Failed to authenticate token.
 *       500:
 *         description: Internal server error. 
 *   
 */ 


 /** 
  * @swagger
 /Ideas/DeleteIdeaResponse: 
 *   post: 
 *     description: Delete a comment of idea.
 *     tags:
 *       - Ideas  
 *     summary: Delete a comment of idea.
 *     parameters: 
 *     - name: Model 
 *       description: Delete a comment of idea.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/DeleteCommentIdeaModel'
 *     produces:
 *       - application/json
 *     responses:  
 *       201: 
 *         description: Data Deleted Successful.
 *       400:
 *         description: Failed to deleted Response.
 *       401: 
 *         description: Failed to authenticate token.
 *       500:
 *         description: Internal server error.
 */ 


// router.post('/ChangeIdeaStatus ', function (req, res) {
//     ideasController.ChangeIdeaStatus (req, res);
// });

/** 
 * @swagger 
 * definitions:
 *   SearchIdeaModel:
 *     properties:
 *       user_id:
 *         type: integer  
 *       token:
 *         type: string
 *       search_text:
 *         type: string
 */
 /** 
  * @swagger
 /Ideas/SearchIdea: 
 *   post: 
 *     description: Search data in idea.
 *     tags:
 *       - Ideas  
 *     summary: Search data in idea.
 *     parameters: 
 *     - name: Model 
 *       description: Search data in idea.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/SearchIdeaModel'
 *     produces:
 *       - application/json
 *     responses:  
 *       200: 
 *         description: Data Found Successful.
 *       401: 
 *         description: Failed to authenticate token.
 *       404:
 *         description: Data Not Found
 *       500:
 *         description: Internal server error.  
 */ 

/** 
 * @swagger 
 * definitions:
 *   GetIdeaCategoryModel:
 *     properties:
 *       user_id:
 *         type: integer  
 *       token:
 *         type: string
 */
 /** 
  * @swagger
 /Ideas/IdeaCategory: 
 *   post: 
 *     description: Get idea category list.
 *     tags:
 *       - Ideas  
 *     summary: Get idea category list.
 *     parameters: 
 *     - name: Model 
 *       description: Get idea category list.
 *       in: body 
 *       required: true
 *       schema: 
 *          $ref: '#/definitions/GetIdeaCategoryModel'
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


