export type Role = 'farmer' | 'consumer' | 'admin';
export type ProduceCategory = 'fruit' | 'vegetable' | 'grain' | 'tuber' | 'leafy_green' | 'other';
export type ListingStatus = 'active' | 'sold_out' | 'expired' | 'removed';
export type FreshnessCategory = 'Excellent' | 'Good' | 'Fair' | 'Poor';
export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'fulfilled' | 'cancelled' | 'disputed';
export type FulfilmentMethod = 'pickup' | 'delivery';
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'refunded';
export type PayoutStatus = 'held' | 'released' | 'paid_out';
export type RevenueTrend = 'growing' | 'stable' | 'declining';
export type ScoreBand = 'Emerging' | 'Developing' | 'Established' | 'Strong';
export type CancellationInitiator = 'farmer' | 'consumer';

export interface Profile {
  id: string;
  role: Role;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar_url: string | null;
  bvn_verified: boolean;
  wema_account_linked: boolean;
  wema_account_reference: string | null;
  created_at: string;
}

export interface Farm {
  id: string;
  owner_id: string;
  farm_name: string;
  description: string | null;
  location: any | null; // GEOGRAPHY
  address: string | null;
  lga: string | null;
  state: string;
  landmark: string | null;
  farm_size_hectares: number | null;
  primary_crops: string[] | null;
  is_verified: boolean;
  created_at: string;
}

export interface ProduceListing {
  id: string;
  farm_id: string;
  farmer_id: string;
  produce_name: string;
  category: ProduceCategory;
  quantity_kg: number;
  price_per_kg: number;
  availability_from: string | null;
  availability_to: string | null;
  pickup_available: boolean;
  delivery_available: boolean;
  photo_url: string | null;
  freshness_score: number | null;
  freshness_grade: string | null;
  estimated_shelf_life_days: number | null;
  last_scan_id: string | null;
  status: ListingStatus;
  created_at: string;
}

export interface ProduceScan {
  id: string;
  listing_id: string | null;
  farmer_id: string;
  freshness_score: number | null;
  freshness_category: FreshnessCategory | null;
  estimated_shelf_life_days: number | null;
  detected_produce: string | null;
  confidence_score: number | null;
  scan_image_url: string | null;
  scanned_at: string;
}

export interface Order {
  id: string;
  listing_id: string;
  consumer_id: string;
  farmer_id: string;
  quantity_kg: number;
  unit_price: number;
  total_amount: number;
  status: OrderStatus;
  fulfilment_method: FulfilmentMethod;
  placed_at: string;
  accepted_at: string | null;
  fulfilled_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  cancellation_initiator: CancellationInitiator | null;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  payment_method: string | null;
  payment_reference: string | null;
  status: PaymentStatus;
  paid_at: string | null;
  payout_status: PayoutStatus;
  payout_at: string | null;
}

export interface Review {
  id: string;
  order_id: string;
  reviewer_id: string;
  farmer_id: string;
  rating: number;
  freshness_rating: number | null;
  fulfillment_rating: number | null;
  comment: string | null;
  reviewed_at: string;
}

export interface FarmerActivityProfile {
  id: string;
  farmer_id: string;
  profile_period_start: string | null;
  profile_period_end: string | null;
  total_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  farmer_initiated_cancellations: number;
  fulfilment_rate: number;
  total_revenue_ngn: number;
  average_order_value_ngn: number;
  active_months: number;
  consecutive_active_months: number;
  unique_customers: number;
  repeat_customers: number;
  repeat_customer_rate: number;
  average_freshness_score: number | null;
  spoilage_rate: number;
  scan_compliance_rate: number;
  platform_tenure_days: number;
  revenue_stability_index: number | null;
  revenue_trend: RevenueTrend | null;
  computed_at: string;
}

export interface FarmerScore {
  id: string;
  farmer_id: string;
  score_version: string;
  total_score: number;
  transaction_consistency_score: number;
  sales_performance_score: number;
  fulfilment_score: number;
  customer_trust_score: number;
  business_tenure_score: number;
  quality_consistency_score: number;
  revenue_stability_score: number;
  score_band: ScoreBand | null;
  score_label: string | null;
  positive_signals: any;
  improvement_areas: any;
  milestone_progress: any;
  computed_at: string;
  is_latest: boolean;
}

export interface ScoreEvent {
  id: string;
  farmer_id: string;
  event_type: string;
  score_before: number | null;
  score_after: number | null;
  delta: number | null;
  event_description: string | null;
  created_at: string;
}

export interface WemaConsent {
  id: string;
  farmer_id: string;
  consented_at: string;
  consent_version: string;
  consent_scope: string[];
  is_active: boolean;
  revoked_at: string | null;
  revocation_reason: string | null;
}

export interface MockWemaAccount {
  id: string;
  farmer_id: string;
  mock_account_number: string;
  mock_account_name: string;
  mock_balance: number;
  created_at: string;
  note: string;
}

export type InsertProfile = Omit<Profile, 'created_at'> & { created_at?: string };
export type UpdateProfile = Partial<InsertProfile>;

export type InsertFarm = Omit<Farm, 'id' | 'created_at'> & { id?: string; created_at?: string };
export type UpdateFarm = Partial<InsertFarm>;

export type InsertProduceListing = Omit<ProduceListing, 'id' | 'created_at'> & { id?: string; created_at?: string };
export type UpdateProduceListing = Partial<InsertProduceListing>;

export type InsertProduceScan = Omit<ProduceScan, 'id'> & { id?: string; scanned_at?: string };
export type UpdateProduceScan = Partial<InsertProduceScan>;

export type InsertOrder = Omit<Order, 'id' | 'placed_at'> & { id?: string; placed_at?: string };
export type UpdateOrder = Partial<InsertOrder>;

export type InsertPayment = Omit<Payment, 'id'> & { id?: string };
export type UpdatePayment = Partial<InsertPayment>;

export type InsertReview = Omit<Review, 'id' | 'reviewed_at'> & { id?: string; reviewed_at?: string };
export type UpdateReview = Partial<InsertReview>;

export type InsertFarmerActivityProfile = Omit<FarmerActivityProfile, 'id' | 'computed_at'> & { id?: string; computed_at?: string };
export type UpdateFarmerActivityProfile = Partial<InsertFarmerActivityProfile>;

export type InsertFarmerScore = Omit<FarmerScore, 'id' | 'computed_at'> & { id?: string; computed_at?: string };
export type UpdateFarmerScore = Partial<InsertFarmerScore>;

export type InsertScoreEvent = Omit<ScoreEvent, 'id' | 'created_at'> & { id?: string; created_at?: string };
export type UpdateScoreEvent = Partial<InsertScoreEvent>;

export type InsertWemaConsent = Omit<WemaConsent, 'id' | 'consented_at'> & { id?: string; consented_at?: string };
export type UpdateWemaConsent = Partial<InsertWemaConsent>;

export type InsertMockWemaAccount = Omit<MockWemaAccount, 'id' | 'created_at'> & { id?: string; created_at?: string };
export type UpdateMockWemaAccount = Partial<InsertMockWemaAccount>;
