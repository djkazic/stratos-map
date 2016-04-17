package org.alopex.stratos.net.process;

import org.alopex.stratos.db.DB;
import org.bson.Document;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.mongodb.Block;
import com.mongodb.client.FindIterable;

public class Hardpoint extends ServerResource {

	@Post("application/text")
	public String process(JsonRepresentation entity) {
		this.getResponse().setAccessControlAllowOrigin("*");
		final JSONObject responseJSON = new JSONObject();
		try {
			JSONObject json = entity.getJsonObject();
			if (json.length() > 0) {
				String lat = json.getString("lat");
				String lon = json.getString("lon");
				
				FindIterable<Document> iterable = DB.getDatabase()
						                            .getCollection("hardpoint")
						                            .find(new Document("lat", lat).append("lon", lon));
				
				iterable.forEach(new Block<Document> () {
					public void apply(Document doc) {
						try {
							responseJSON.put("energy", doc.getString("energy"));
						} catch (Exception ex) {
							ex.printStackTrace();
						}
					}
				});
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return responseJSON.toString();
	}
}
