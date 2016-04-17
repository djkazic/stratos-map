package org.alopex.stratos.net.api;

import java.util.logging.LogManager;

import org.restlet.Application;
import org.restlet.Component;
import org.restlet.Restlet;
import org.restlet.data.Protocol;
import org.restlet.routing.Router;

public class APIRouter extends Application {

	public static void init() {
		try {
			Component component = new Component();
			component.getServers().add(Protocol.HTTP, 8888);
			component.getDefaultHost().attach(new APIRouter());
			component.start();
			LogManager.getLogManager().reset();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Registers /api/ restlet for bridge routing
	 */
	public Restlet createInboundRoot() {
		Router router = new Router(getContext());
		router.attachDefault(EchoPage.class);
		router.attach("/api/search", Search.class);
		return router;
	}
}
