import { PlanService } from "./PlanService.js";
import { PaymentSimulator } from "./PaymentSimulator.js";
import { PortalView } from "./PortalView.js";

const planService = new PlanService();
const paymentSimulator = new PaymentSimulator();
const view = new PortalView(planService, paymentSimulator);

view.init();
