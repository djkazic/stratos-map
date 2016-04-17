package org.alopex.stratos.net.process;

import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

public class Hardpoint extends ServerResource {

	@Post("application/text")
	public String process(JsonRepresentation entity) {
		this.getResponse().setAccessControlAllowOrigin("*");
		JSONObject responseJSON = new JSONObject();
		try {
			JSONObject json = entity.getJsonObject();
			if (json.length() > 0) {
				String lat = json.getString("lat");
				String lon = json.getString("lon");
				
				// Pull hardpoint obj from MongoDB using lat / long
				
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return responseJSON.toString();
	}
}
