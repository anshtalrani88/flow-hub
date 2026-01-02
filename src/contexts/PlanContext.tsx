import { createContext, useContext, useState, ReactNode, useCallback } from "react";

// ============================================
// PLAN TYPES - Aligned with PRICING_STRUCTURE.txt
// ============================================
export type PlanTier = "FREE" | "STARTER" | "GROWTH" | "PRO" | "ENTERPRISE";
export type TenantStatus = "trial" | "active" | "past_due" | "suspended";

// ============================================
// FEATURE FLAGS - Engineering-ready keys
// ============================================
export const FEATURE_FLAGS = {
  // Tenant level
  "tenant.live_mode": "tenant.live_mode",
  "sandbox.mode": "sandbox.mode",
  "regions.multi": "regions.multi",
  
  // Unified Inbox & Channels
  "channels.whatsapp": "channels.whatsapp",
  "channels.sms": "channels.sms",
  "channels.mms": "channels.mms",
  "channels.email": "channels.email",
  "channels.voice": "channels.voice",
  "channels.webchat": "channels.webchat",
  "channels.telegram": "channels.telegram",
  "channels.facebook": "channels.facebook",
  "channels.instagram": "channels.instagram",
  "channels.social": "channels.social",
  "channels.teams": "channels.teams",
  "channels.slack": "channels.slack",
  
  // CRM
  "crm.contacts": "crm.contacts",
  "crm.deals": "crm.deals",
  "crm.pipelines": "crm.pipelines",
  "crm.import": "crm.import",
  "crm.export": "crm.export",
  "crm.live_data": "crm.live_data",
  
  // Automations
  "automation.builder": "automation.builder",
  "automation.publish": "automation.publish",
  "automation.simulate": "automation.simulate",
  "automation.conditions.advanced": "automation.conditions.advanced",
  "automation.webhooks": "automation.webhooks",
  
  // AI
  "ai.agent.builder": "ai.agent.builder",
  "ai.agent.deploy": "ai.agent.deploy",
  "ai.inference.live": "ai.inference.live",
  "ai.summaries": "ai.summaries",
  "ai.reply_suggestions": "ai.reply_suggestions",
  "ai.intent_detection": "ai.intent_detection",
  "ai.sentiment": "ai.sentiment",
  "ai.qa": "ai.qa",
  
  // Telephony
  "telephony.ui": "telephony.ui",
  "telephony.ivr.builder": "telephony.ivr.builder",
  "telephony.calls.live": "telephony.calls.live",
  "telephony.recordings": "telephony.recordings",
  "telephony.ivr.deploy": "telephony.ivr.deploy",
  "telephony.routing.advanced": "telephony.routing.advanced",
  
  // Dashboard
  "dashboard.view": "dashboard.view",
  "dashboard.data.demo": "dashboard.data.demo",
  "dashboard.realtime": "dashboard.realtime",
  
  // Analytics
  "analytics.basic": "analytics.basic",
  "analytics.advanced": "analytics.advanced",
  "analytics.export": "analytics.export",
  
  // Branding
  "branding.preview": "branding.preview",
  "branding.basic": "branding.basic",
  "branding.custom_domain": "branding.custom_domain",
  "branding.full_white_label": "branding.full_white_label",
  
  // API / Dev
  "api.docs.readonly": "api.docs.readonly",
  "api.keys.issue": "api.keys.issue",
  "webhooks.create": "webhooks.create",
  
  // Team
  "users.roles": "users.roles",
  "users.permissions.advanced": "users.permissions.advanced",
  
  // Compliance
  "audit.logs": "audit.logs",
  "sso.saml": "sso.saml",
} as const;

export type FeatureKey = keyof typeof FEATURE_FLAGS;

// ============================================
// PLAN ENTITLEMENTS - Source of truth per plan
// ============================================
type EntitlementValue = boolean | number | string;

const PLAN_ENTITLEMENTS: Record<PlanTier, Partial<Record<FeatureKey, EntitlementValue>>> = {
  FREE: {
    "sandbox.mode": true,
    "tenant.live_mode": false,
    "channels.whatsapp": true, // Simulated only
    "channels.sms": false,
    "channels.email": false,
    "channels.voice": false,
    "crm.contacts": true,
    "crm.deals": true,
    "crm.pipelines": true,
    "crm.import": false,
    "crm.export": false,
    "automation.builder": true,
    "automation.publish": false,
    "automation.simulate": true,
    "ai.agent.builder": true,
    "ai.agent.deploy": false,
    "ai.inference.live": false,
    "telephony.ui": true,
    "telephony.ivr.builder": true,
    "telephony.calls.live": false,
    "dashboard.view": true,
    "dashboard.data.demo": true,
    "branding.preview": true,
    "branding.custom_domain": false,
    "api.docs.readonly": true,
    "api.keys.issue": false,
  },
  
  STARTER: {
    "sandbox.mode": false,
    "tenant.live_mode": true,
    "regions.multi": false,
    "channels.whatsapp": true,
    "channels.sms": true,
    "channels.email": true,
    "channels.voice": true,
    "channels.webchat": true,
    "channels.telegram": false,
    "crm.contacts": true,
    "crm.deals": true,
    "crm.pipelines": true,
    "crm.import": true,
    "crm.export": false,
    "crm.live_data": true,
    "automation.builder": true,
    "automation.publish": true,
    "automation.simulate": true,
    "automation.conditions.advanced": false,
    "ai.agent.builder": true,
    "ai.agent.deploy": false,
    "ai.summaries": true,
    "ai.reply_suggestions": true,
    "ai.inference.live": true,
    "telephony.ui": true,
    "telephony.ivr.builder": true,
    "telephony.calls.live": true,
    "telephony.recordings": false,
    "telephony.ivr.deploy": false,
    "analytics.basic": true,
    "analytics.advanced": false,
    "branding.preview": true,
    "branding.basic": true,
    "branding.custom_domain": false,
    "api.docs.readonly": true,
    "api.keys.issue": false,
  },
  
  GROWTH: {
    "sandbox.mode": false,
    "tenant.live_mode": true,
    "regions.multi": false,
    "channels.whatsapp": true,
    "channels.sms": true,
    "channels.mms": true,
    "channels.email": true,
    "channels.voice": true,
    "channels.webchat": true,
    "channels.telegram": true,
    "channels.social": true, // Limited
    "crm.contacts": true,
    "crm.deals": true,
    "crm.pipelines": true,
    "crm.import": true,
    "crm.export": true,
    "crm.live_data": true,
    "automation.builder": true,
    "automation.publish": true,
    "automation.simulate": true,
    "automation.conditions.advanced": true,
    "automation.webhooks": false,
    "ai.agent.builder": true,
    "ai.agent.deploy": true,
    "ai.summaries": true,
    "ai.reply_suggestions": true,
    "ai.inference.live": true,
    "ai.intent_detection": true,
    "telephony.ui": true,
    "telephony.ivr.builder": true,
    "telephony.calls.live": true,
    "telephony.recordings": true,
    "telephony.ivr.deploy": true,
    "telephony.routing.advanced": true,
    "analytics.basic": true,
    "analytics.advanced": true,
    "branding.preview": true,
    "branding.basic": true,
    "branding.custom_domain": false,
    "users.roles": true,
    "users.permissions.advanced": true,
    "api.docs.readonly": true,
    "api.keys.issue": false,
  },
  
  PRO: {
    "sandbox.mode": false,
    "tenant.live_mode": true,
    "regions.multi": true,
    "channels.whatsapp": true,
    "channels.sms": true,
    "channels.mms": true,
    "channels.email": true,
    "channels.voice": true,
    "channels.webchat": true,
    "channels.telegram": true,
    "channels.facebook": true,
    "channels.instagram": true,
    "channels.teams": true,
    "channels.slack": true,
    "crm.contacts": true,
    "crm.deals": true,
    "crm.pipelines": true,
    "crm.import": true,
    "crm.export": true,
    "crm.live_data": true,
    "automation.builder": true,
    "automation.publish": true,
    "automation.simulate": true,
    "automation.conditions.advanced": true,
    "automation.webhooks": true,
    "ai.agent.builder": true,
    "ai.agent.deploy": true,
    "ai.summaries": true,
    "ai.reply_suggestions": true,
    "ai.inference.live": true,
    "ai.intent_detection": true,
    "ai.sentiment": true,
    "ai.qa": true,
    "telephony.ui": true,
    "telephony.ivr.builder": true,
    "telephony.calls.live": true,
    "telephony.recordings": true,
    "telephony.ivr.deploy": true,
    "telephony.routing.advanced": true,
    "analytics.basic": true,
    "analytics.advanced": true,
    "analytics.export": true,
    "branding.preview": true,
    "branding.basic": true,
    "branding.custom_domain": true,
    "branding.full_white_label": true,
    "users.roles": true,
    "users.permissions.advanced": true,
    "api.docs.readonly": true,
    "api.keys.issue": true,
    "webhooks.create": true,
    "audit.logs": true,
  },
  
  ENTERPRISE: {
    // Everything from PRO plus custom overrides
    "sandbox.mode": false,
    "tenant.live_mode": true,
    "regions.multi": true,
    "channels.whatsapp": true,
    "channels.sms": true,
    "channels.mms": true,
    "channels.email": true,
    "channels.voice": true,
    "channels.webchat": true,
    "channels.telegram": true,
    "channels.facebook": true,
    "channels.instagram": true,
    "channels.teams": true,
    "channels.slack": true,
    "crm.contacts": true,
    "crm.deals": true,
    "crm.pipelines": true,
    "crm.import": true,
    "crm.export": true,
    "crm.live_data": true,
    "automation.builder": true,
    "automation.publish": true,
    "automation.simulate": true,
    "automation.conditions.advanced": true,
    "automation.webhooks": true,
    "ai.agent.builder": true,
    "ai.agent.deploy": true,
    "ai.summaries": true,
    "ai.reply_suggestions": true,
    "ai.inference.live": true,
    "ai.intent_detection": true,
    "ai.sentiment": true,
    "ai.qa": true,
    "telephony.ui": true,
    "telephony.ivr.builder": true,
    "telephony.calls.live": true,
    "telephony.recordings": true,
    "telephony.ivr.deploy": true,
    "telephony.routing.advanced": true,
    "analytics.basic": true,
    "analytics.advanced": true,
    "analytics.export": true,
    "branding.preview": true,
    "branding.basic": true,
    "branding.custom_domain": true,
    "branding.full_white_label": true,
    "users.roles": true,
    "users.permissions.advanced": true,
    "api.docs.readonly": true,
    "api.keys.issue": true,
    "webhooks.create": true,
    "audit.logs": true,
    "sso.saml": true,
  },
};

// ============================================
// PLAN METADATA
// ============================================
export interface PlanInfo {
  id: PlanTier;
  name: string;
  description: string;
  price: number | null; // null = custom pricing
  billingCycle: "monthly" | "yearly" | "custom";
  isPopular?: boolean;
}

export const PLANS: Record<PlanTier, PlanInfo> = {
  FREE: {
    id: "FREE",
    name: "Free",
    description: "Explore the platform in sandbox mode",
    price: 0,
    billingCycle: "monthly",
  },
  STARTER: {
    id: "STARTER",
    name: "Starter",
    description: "Go live with your first conversations",
    price: 29,
    billingCycle: "monthly",
  },
  GROWTH: {
    id: "GROWTH",
    name: "Growth",
    description: "Scale operations with automation & AI",
    price: 99,
    billingCycle: "monthly",
    isPopular: true,
  },
  PRO: {
    id: "PRO",
    name: "Pro",
    description: "Full control with advanced features",
    price: 249,
    billingCycle: "monthly",
  },
  ENTERPRISE: {
    id: "ENTERPRISE",
    name: "Enterprise",
    description: "Mission-critical deployment",
    price: null,
    billingCycle: "custom",
  },
};

// ============================================
// CONTEXT TYPES
// ============================================
interface TenantOverride {
  featureKey: FeatureKey;
  value: EntitlementValue;
  expiresAt?: Date;
}

interface PlanContextState {
  currentPlan: PlanTier;
  tenantStatus: TenantStatus;
  trialEndsAt: Date | null;
  tenantOverrides: TenantOverride[];
}

interface PlanContextType extends PlanContextState {
  // Entitlement resolution (tenant override → plan → false)
  isEntitled: (featureKey: FeatureKey) => boolean;
  getEntitlementValue: (featureKey: FeatureKey) => EntitlementValue;
  
  // Plan management
  upgradePlan: (newPlan: PlanTier) => void;
  getPlanInfo: (plan: PlanTier) => PlanInfo;
  getRequiredPlanForFeature: (featureKey: FeatureKey) => PlanTier | null;
  
  // Status helpers
  isLiveMode: () => boolean;
  isSandboxMode: () => boolean;
  isTrialActive: () => boolean;
  
  // For testing/demo
  setTenantOverride: (featureKey: FeatureKey, value: EntitlementValue, expiresAt?: Date) => void;
}

// ============================================
// CONTEXT
// ============================================
const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PlanContextState>(() => {
    const stored = localStorage.getItem("flyn_plan");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        trialEndsAt: parsed.trialEndsAt ? new Date(parsed.trialEndsAt) : null,
      };
    }
    return {
      currentPlan: "FREE" as PlanTier,
      tenantStatus: "trial" as TenantStatus,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      tenantOverrides: [],
    };
  });

  // Persist state changes
  const persistState = useCallback((newState: PlanContextState) => {
    localStorage.setItem("flyn_plan", JSON.stringify(newState));
    setState(newState);
  }, []);

  // Resolution order: tenant override → plan → false
  const getEntitlementValue = useCallback((featureKey: FeatureKey): EntitlementValue => {
    // 1. Check tenant override (highest priority)
    const override = state.tenantOverrides.find(o => o.featureKey === featureKey);
    if (override) {
      // Check if expired
      if (!override.expiresAt || new Date() < override.expiresAt) {
        return override.value;
      }
    }
    
    // 2. Check plan entitlement
    const planEntitlements = PLAN_ENTITLEMENTS[state.currentPlan];
    if (featureKey in planEntitlements) {
      return planEntitlements[featureKey]!;
    }
    
    // 3. Default = false
    return false;
  }, [state.currentPlan, state.tenantOverrides]);

  const isEntitled = useCallback((featureKey: FeatureKey): boolean => {
    const value = getEntitlementValue(featureKey);
    return value === true || (typeof value === "number" && value > 0) || 
           (typeof value === "string" && value !== "" && value !== "false");
  }, [getEntitlementValue]);

  const getRequiredPlanForFeature = useCallback((featureKey: FeatureKey): PlanTier | null => {
    const planOrder: PlanTier[] = ["FREE", "STARTER", "GROWTH", "PRO", "ENTERPRISE"];
    
    for (const plan of planOrder) {
      const entitlements = PLAN_ENTITLEMENTS[plan];
      const value = entitlements[featureKey];
      if (value === true || (typeof value === "number" && value > 0)) {
        return plan;
      }
    }
    return null;
  }, []);

  const upgradePlan = useCallback((newPlan: PlanTier) => {
    persistState({
      ...state,
      currentPlan: newPlan,
      tenantStatus: newPlan === "FREE" ? "trial" : "active",
      trialEndsAt: newPlan === "FREE" ? state.trialEndsAt : null,
    });
  }, [state, persistState]);

  const getPlanInfo = useCallback((plan: PlanTier): PlanInfo => {
    return PLANS[plan];
  }, []);

  const isLiveMode = useCallback(() => {
    return getEntitlementValue("tenant.live_mode") === true;
  }, [getEntitlementValue]);

  const isSandboxMode = useCallback(() => {
    return getEntitlementValue("sandbox.mode") === true;
  }, [getEntitlementValue]);

  const isTrialActive = useCallback(() => {
    return state.tenantStatus === "trial" && 
           state.trialEndsAt !== null && 
           new Date() < state.trialEndsAt;
  }, [state.tenantStatus, state.trialEndsAt]);

  const setTenantOverride = useCallback((
    featureKey: FeatureKey, 
    value: EntitlementValue, 
    expiresAt?: Date
  ) => {
    const newOverrides = state.tenantOverrides.filter(o => o.featureKey !== featureKey);
    newOverrides.push({ featureKey, value, expiresAt });
    persistState({ ...state, tenantOverrides: newOverrides });
  }, [state, persistState]);

  return (
    <PlanContext.Provider
      value={{
        ...state,
        isEntitled,
        getEntitlementValue,
        upgradePlan,
        getPlanInfo,
        getRequiredPlanForFeature,
        isLiveMode,
        isSandboxMode,
        isTrialActive,
        setTenantOverride,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within PlanProvider");
  }
  return context;
};

// ============================================
// HELPER HOOKS
// ============================================
export const useFeatureGate = (featureKey: FeatureKey) => {
  const { isEntitled, getRequiredPlanForFeature, currentPlan, isSandboxMode } = usePlan();
  
  return {
    isEnabled: isEntitled(featureKey),
    requiredPlan: getRequiredPlanForFeature(featureKey),
    currentPlan,
    isSandboxMode: isSandboxMode(),
  };
};
