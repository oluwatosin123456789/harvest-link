-- Ensure UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define specific UUIDs for testing consistency
DO $$
DECLARE
  amaka_id UUID := '00000000-0000-0000-0000-000000000001';
  farmer2_id UUID := '00000000-0000-0000-0000-000000000002';
  farmer3_id UUID := '00000000-0000-0000-0000-000000000003';
  farmer4_id UUID := '00000000-0000-0000-0000-000000000004';
  farmer5_id UUID := '00000000-0000-0000-0000-000000000005';
  farmer6_id UUID := '00000000-0000-0000-0000-000000000006';
  farmer7_id UUID := '00000000-0000-0000-0000-000000000007';
  farmer8_id UUID := '00000000-0000-0000-0000-000000000008';
  farmer9_id UUID := '00000000-0000-0000-0000-000000000009';
  farmer10_id UUID := '00000000-0000-0000-0000-000000000010';
  
  consumer1_id UUID := '11111111-1111-1111-1111-111111111111';
  consumer2_id UUID := '11111111-1111-1111-1111-111111111112';
  consumer3_id UUID := '11111111-1111-1111-1111-111111111113';
  consumer4_id UUID := '11111111-1111-1111-1111-111111111114';
  consumer5_id UUID := '11111111-1111-1111-1111-111111111115';
  
  amaka_farm UUID := '22222222-2222-2222-2222-222222222222';
  amaka_listing UUID := '33333333-3333-3333-3333-333333333333';
  amaka_order UUID := '44444444-4444-4444-4444-444444444444';
  
BEGIN
  -- Insert into auth.users (requires superuser or workaround in Supabase; assuming we can insert into auth.users directly in seed)
  INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  VALUES 
    (amaka_id, '00000000-0000-0000-0000-000000000000', 'amaka@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (farmer2_id, '00000000-0000-0000-0000-000000000000', 'farmer2@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (farmer3_id, '00000000-0000-0000-0000-000000000000', 'farmer3@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (farmer4_id, '00000000-0000-0000-0000-000000000000', 'farmer4@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (farmer5_id, '00000000-0000-0000-0000-000000000000', 'farmer5@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (farmer6_id, '00000000-0000-0000-0000-000000000000', 'farmer6@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (farmer7_id, '00000000-0000-0000-0000-000000000000', 'farmer7@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (farmer8_id, '00000000-0000-0000-0000-000000000000', 'farmer8@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (farmer9_id, '00000000-0000-0000-0000-000000000000', 'farmer9@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (farmer10_id, '00000000-0000-0000-0000-000000000000', 'farmer10@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (consumer1_id, '00000000-0000-0000-0000-000000000000', 'consumer1@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (consumer2_id, '00000000-0000-0000-0000-000000000000', 'consumer2@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (consumer3_id, '00000000-0000-0000-0000-000000000000', 'consumer3@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (consumer4_id, '00000000-0000-0000-0000-000000000000', 'consumer4@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now()),
    (consumer5_id, '00000000-0000-0000-0000-000000000000', 'consumer5@example.com', 'password_hash', now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now())
  ON CONFLICT DO NOTHING;

  -- Insert Profiles
  INSERT INTO profiles (id, role, first_name, last_name, phone, bvn_verified, wema_account_linked, wema_account_reference)
  VALUES 
    (amaka_id, 'farmer', 'Amaka', 'Okafor', '08012345678', true, true, 'WEMA-001'),
    (farmer2_id, 'farmer', 'Tunde', 'Adebayo', '08023456789', true, true, 'WEMA-002'),
    (farmer3_id, 'farmer', 'Chidi', 'Nwachukwu', '08034567890', true, false, null),
    (farmer4_id, 'farmer', 'Aisha', 'Mohammed', '08045678901', true, true, 'WEMA-004'),
    (farmer5_id, 'farmer', 'Emeka', 'Eze', '08056789012', false, false, null),
    (farmer6_id, 'farmer', 'Ngozi', 'Ibrahim', '08067890123', true, true, 'WEMA-006'),
    (farmer7_id, 'farmer', 'Babatunde', 'Ogunleye', '08078901234', true, true, 'WEMA-007'),
    (farmer8_id, 'farmer', 'Fatima', 'Danjuma', '08089012345', true, false, null),
    (farmer9_id, 'farmer', 'Obinna', 'Okeke', '08090123456', true, true, 'WEMA-009'),
    (farmer10_id, 'farmer', 'Folake', 'Adebisi', '08101234567', false, false, null),
    (consumer1_id, 'consumer', 'Kemi', 'Ojo', '08112345678', true, false, null),
    (consumer2_id, 'consumer', 'Segun', 'Oluwa', '08123456789', true, false, null),
    (consumer3_id, 'consumer', 'Nnana', 'Obi', '08134567890', false, false, null),
    (consumer4_id, 'consumer', 'Zainab', 'Aliyu', '08145678901', true, false, null),
    (consumer5_id, 'consumer', 'Dayo', 'Adeyemi', '08156789012', true, false, null)
  ON CONFLICT (id) DO NOTHING;

  -- Insert Amaka Data
  INSERT INTO farms (id, owner_id, farm_name, state, lga, address, is_verified)
  VALUES (amaka_farm, amaka_id, 'Amaka Green Farm', 'Lagos', 'Epe', '12 Farm Road, Epe', true)
  ON CONFLICT DO NOTHING;

  INSERT INTO farmer_activity_profiles (farmer_id, completed_orders, fulfilment_rate, total_revenue_ngn, average_order_value_ngn, active_months, consecutive_active_months, repeat_customers, repeat_customer_rate, average_freshness_score, platform_tenure_days)
  VALUES (amaka_id, 38, 92.00, 412000.00, 10842.10, 5, 5, 12, 31.00, 81.00, 150)
  ON CONFLICT DO NOTHING;

  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest)
  VALUES (amaka_id, 74.00, 'Established', true)
  ON CONFLICT DO NOTHING;

  INSERT INTO wema_consents (farmer_id, is_active)
  VALUES (amaka_id, true)
  ON CONFLICT DO NOTHING;

  -- Insert mock wema account for amaka
  INSERT INTO mock_wema_accounts (farmer_id, mock_account_number, mock_account_name, mock_balance)
  VALUES (amaka_id, '0123456789', 'Amaka Okafor', 450000.00)
  ON CONFLICT DO NOTHING;

  -- Other Farmers Activity & Scores
  -- Farmer 2: Strong
  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest) VALUES (farmer2_id, 88.00, 'Strong', true) ON CONFLICT DO NOTHING;
  -- Farmer 3: Developing
  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest) VALUES (farmer3_id, 55.00, 'Developing', true) ON CONFLICT DO NOTHING;
  -- Farmer 4: Emerging
  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest) VALUES (farmer4_id, 35.00, 'Emerging', true) ON CONFLICT DO NOTHING;
  -- Farmer 5: Developing
  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest) VALUES (farmer5_id, 45.00, 'Developing', true) ON CONFLICT DO NOTHING;
  -- Farmer 6: Established
  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest) VALUES (farmer6_id, 71.00, 'Established', true) ON CONFLICT DO NOTHING;
  -- Farmer 7: Strong
  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest) VALUES (farmer7_id, 92.00, 'Strong', true) ON CONFLICT DO NOTHING;
  -- Farmer 8: Emerging
  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest) VALUES (farmer8_id, 20.00, 'Emerging', true) ON CONFLICT DO NOTHING;
  -- Farmer 9: Established
  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest) VALUES (farmer9_id, 65.00, 'Established', true) ON CONFLICT DO NOTHING;
  -- Farmer 10: Developing
  INSERT INTO farmer_scores (farmer_id, total_score, score_band, is_latest) VALUES (farmer10_id, 50.00, 'Developing', true) ON CONFLICT DO NOTHING;

  -- Add listings
  INSERT INTO produce_listings (id, farm_id, farmer_id, produce_name, category, quantity_kg, price_per_kg, freshness_score)
  VALUES (amaka_listing, amaka_farm, amaka_id, 'Tomatoes', 'vegetable', 50, 1500, 85)
  ON CONFLICT DO NOTHING;

  -- Add Orders
  INSERT INTO orders (id, listing_id, consumer_id, farmer_id, quantity_kg, unit_price, total_amount, status)
  VALUES (amaka_order, amaka_listing, consumer1_id, amaka_id, 10, 1500, 15000, 'fulfilled')
  ON CONFLICT DO NOTHING;

  -- Add reviews
  INSERT INTO reviews (order_id, reviewer_id, farmer_id, rating, comment)
  VALUES (amaka_order, consumer1_id, amaka_id, 5, 'Great quality tomatoes!')
  ON CONFLICT DO NOTHING;

END $$;
