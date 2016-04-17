package org.alopex.stratos;

import org.alopex.stratos.net.api.APIRouter;
import org.alopex.stratos.util.Utils;

public class Stratos {
	
	public static void main(String[] args) {
		Utils.log("Core", "Initializing API endpoints...");
		APIRouter.init();
		
		
	}
}
