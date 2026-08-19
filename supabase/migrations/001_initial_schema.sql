-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- PROFILES (extends Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('farmer', 'consumer', 'admin')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  bvn_verified BOOLEAN DEFAULT false,
  wema_account_linked BOOLEAN DEFAULT false,
  wema_account_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- FARMS
CREATE TABLE farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  description TEXT,
  location GEOGRAPHY(Point, 4326),
  address TEXT,
  lga TEXT,
  state TEXT NOT NULL,
  landmark TEXT,
  farm_size_hectares DECIMAL,
  primary_crops TEXT[],
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX farms_location_idx ON farms USING GIST (location);

-- PRODUCE_LISTINGS
CREATE TABLE produce_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  farmer_id UUID NOT NULL REFERENCES profiles(id),
  produce_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('fruit', 'vegetable', 'grain', 'tuber', 'leafy_green', 'other')),
  quantity_kg DECIMAL NOT NULL,
  price_per_kg DECIMAL NOT NULL,
  availability_from DATE,
  availability_to DATE,
  pickup_available BOOLEAN DEFAULT true,
  delivery_available BOOLEAN DEFAULT false,
  photo_url TEXT,
  freshness_score DECIMAL(5,2),
  freshness_grade TEXT,
  estimated_shelf_life_days INTEGER,
  last_scan_id UUID,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold_out', 'expired', 'removed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- PRODUCE_SCANS (Fresco)
CREATE TABLE produce_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES produce_listings(id),
  farmer_id UUID NOT NULL REFERENCES profiles(id),
  freshness_score DECIMAL(5,2),
  freshness_category TEXT CHECK (freshness_category IN ('Excellent', 'Good', 'Fair', 'Poor')),
  estimated_shelf_life_days INTEGER,
  detected_produce TEXT,
  confidence_score DECIMAL(5,2),
  scan_image_url TEXT,
  scanned_at TIMESTAMPTZ DEFAULT now()
);

-- ORDERS
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES produce_listings(id),
  consumer_id UUID NOT NULL REFERENCES profiles(id),
  farmer_id UUID NOT NULL REFERENCES profiles(id),
  quantity_kg DECIMAL NOT NULL,
  unit_price DECIMAL NOT NULL,
  total_amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'preparing', 'fulfilled', 'cancelled', 'disputed')),
  fulfilment_method TEXT DEFAULT 'pickup' CHECK (fulfilment_method IN ('pickup', 'delivery')),
  placed_at TIMESTAMPTZ DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  fulfilled_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  cancellation_initiator TEXT CHECK (cancellation_initiator IN ('farmer', 'consumer'))
);

-- PAYMENTS
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'NGN',
  payment_method TEXT,
  payment_reference TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'successful', 'failed', 'refunded')),
  paid_at TIMESTAMPTZ,
  payout_status TEXT DEFAULT 'held' CHECK (payout_status IN ('held', 'released', 'paid_out')),
  payout_at TIMESTAMPTZ
);

-- REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  reviewer_id UUID NOT NULL REFERENCES profiles(id),
  farmer_id UUID NOT NULL REFERENCES profiles(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  freshness_rating INTEGER CHECK (freshness_rating BETWEEN 1 AND 5),
  fulfillment_rating INTEGER CHECK (fulfillment_rating BETWEEN 1 AND 5),
  comment TEXT,
  reviewed_at TIMESTAMPTZ DEFAULT now()
);

-- FARMER_ACTIVITY_PROFILES (computed aggregates)
CREATE TABLE farmer_activity_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES profiles(id),
  profile_period_start DATE,
  profile_period_end DATE,
  total_orders INTEGER DEFAULT 0,
  completed_orders INTEGER DEFAULT 0,
  cancelled_orders INTEGER DEFAULT 0,
  farmer_initiated_cancellations INTEGER DEFAULT 0,
  fulfilment_rate DECIMAL(5,2) DEFAULT 0,
  total_revenue_ngn DECIMAL DEFAULT 0,
  average_order_value_ngn DECIMAL DEFAULT 0,
  active_months INTEGER DEFAULT 0,
  consecutive_active_months INTEGER DEFAULT 0,
  unique_customers INTEGER DEFAULT 0,
  repeat_customers INTEGER DEFAULT 0,
  repeat_customer_rate DECIMAL(5,2) DEFAULT 0,
  average_freshness_score DECIMAL(5,2),
  spoilage_rate DECIMAL(5,2) DEFAULT 0,
  scan_compliance_rate DECIMAL(5,2) DEFAULT 0,
  platform_tenure_days INTEGER DEFAULT 0,
  revenue_stability_index DECIMAL(5,2),
  revenue_trend TEXT CHECK (revenue_trend IN ('growing', 'stable', 'declining')),
  computed_at TIMESTAMPTZ DEFAULT now()
);

-- FARMER_SCORES (FEAP)
CREATE TABLE farmer_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES profiles(id),
  score_version TEXT DEFAULT 'v1.0',
  total_score DECIMAL(5,2) DEFAULT 0,
  transaction_consistency_score DECIMAL(5,2) DEFAULT 0,
  sales_performance_score DECIMAL(5,2) DEFAULT 0,
  fulfilment_score DECIMAL(5,2) DEFAULT 0,
  customer_trust_score DECIMAL(5,2) DEFAULT 0,
  business_tenure_score DECIMAL(5,2) DEFAULT 0,
  quality_consistency_score DECIMAL(5,2) DEFAULT 0,
  revenue_stability_score DECIMAL(5,2) DEFAULT 0,
  score_band TEXT CHECK (score_band IN ('Emerging', 'Developing', 'Established', 'Strong')),
  score_label TEXT,
  positive_signals JSONB DEFAULT '[]',
  improvement_areas JSONB DEFAULT '[]',
  milestone_progress JSONB DEFAULT '[]',
  computed_at TIMESTAMPTZ DEFAULT now(),
  is_latest BOOLEAN DEFAULT true
);

-- SCORE_EVENTS (audit trail)
CREATE TABLE score_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES profiles(id),
  event_type TEXT NOT NULL,
  score_before DECIMAL(5,2),
  score_after DECIMAL(5,2),
  delta DECIMAL(5,2),
  event_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- WEMA_CONSENTS
CREATE TABLE wema_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES profiles(id),
  consented_at TIMESTAMPTZ DEFAULT now(),
  consent_version TEXT DEFAULT 'v1.0',
  consent_scope TEXT[] DEFAULT ARRAY['activity_profile', 'score', 'transaction_summary'],
  is_active BOOLEAN DEFAULT true,
  revoked_at TIMESTAMPTZ,
  revocation_reason TEXT
);

-- MOCK_WEMA_ACCOUNTS (prototype only)
CREATE TABLE mock_wema_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES profiles(id),
  mock_account_number TEXT NOT NULL,
  mock_account_name TEXT NOT NULL,
  mock_balance DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  note TEXT DEFAULT 'SIMULATED - NOT A REAL BANK ACCOUNT'
);

-- RLS Settings
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE produce_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE produce_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmer_activity_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmer_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE wema_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_wema_accounts ENABLE ROW LEVEL SECURITY;

-- Basic Policies (can be expanded)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Farms are viewable by everyone" ON farms FOR SELECT USING (true);
CREATE POLICY "Users can manage their own farms" ON farms FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Produce listings are viewable by everyone" ON produce_listings FOR SELECT USING (true);
CREATE POLICY "Farmers can manage own listings" ON produce_listings FOR ALL USING (auth.uid() = farmer_id);

CREATE POLICY "Produce scans are viewable by everyone" ON produce_scans FOR SELECT USING (true);
CREATE POLICY "Farmers can insert scans" ON produce_scans FOR INSERT WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Users can view their orders" ON orders FOR SELECT USING (auth.uid() = consumer_id OR auth.uid() = farmer_id);
CREATE POLICY "Consumers can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = consumer_id);
CREATE POLICY "Parties can update orders" ON orders FOR UPDATE USING (auth.uid() = consumer_id OR auth.uid() = farmer_id);

CREATE POLICY "Users can view their payments" ON payments FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = payments.order_id AND (orders.consumer_id = auth.uid() OR orders.farmer_id = auth.uid())));

CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Consumers can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Farmers can view own activity profiles" ON farmer_activity_profiles FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can view own scores" ON farmer_scores FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can view own score events" ON score_events FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can manage own wema consents" ON wema_consents FOR ALL USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can view own mock wema accounts" ON mock_wema_accounts FOR SELECT USING (auth.uid() = farmer_id);
