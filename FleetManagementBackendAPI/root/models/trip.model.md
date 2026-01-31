Table: trips
Columns:
- id: UUID, PK
- customer_id: UUID, FK → users.id (ON DELETE CASCADE)
- vehicle_id: UUID, FK → vehicles.id (ON DELETE CASCADE)
- start_date: TIMESTAMP
- end_date: TIMESTAMP
- location: TEXT
- distance_km: NUMERIC
- passengers: INTEGER
- tripCost: NUMERIC
- isCompleted: BOOLEAN, default false
- created_at: TIMESTAMP
Relationships:
- Customer → Trips (1:N)
- Vehicle → Trips (1:N)