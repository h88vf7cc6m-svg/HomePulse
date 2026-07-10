export const CATEGORIES = [
  { id: 'hvac', name: 'HVAC', icon: '🌬️', color: '#00C9A7' },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧', color: '#2A6DD9' },
  { id: 'exterior', name: 'Exterior', icon: '🏡', color: '#1DB954' },
  { id: 'electrical', name: 'Electrical', icon: '⚡', color: '#FFB300' },
  { id: 'safety', name: 'Safety', icon: '🛡️', color: '#FF7043' },
  { id: 'insurance', name: 'Insurance', icon: '📋', color: '#00BCD4' },
  { id: 'pest', name: 'Pest Control', icon: '🐜', color: '#8BC34A' },
  { id: 'irrigation', name: 'Irrigation', icon: '💧', color: '#29B6F6' },
  { id: 'weather', name: 'Weather Emergency', icon: '🌪️', color: '#FF5252' },
]

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0]

export const FREQUENCIES = ['Monthly', 'Quarterly', 'Seasonal', 'Annual', 'One-time']

export const REGIONS = [
  { id: 'southeast', name: 'Florida / Southeast' },
  { id: 'midwest', name: 'Midwest' },
  { id: 'northeast', name: 'Northeast' },
]

export const TASK_TEMPLATES = {
  hvac: {
    title: 'HVAC Maintenance',
    icon: '🌬️',
    tips: 'Your HVAC system should be serviced twice a year — once before cooling season and once before heating season. Regular maintenance extends equipment life and lowers energy bills.',
    tasks: [
      { title: 'Replace Air Filter', frequency: 'Monthly', notes: 'Check filter monthly and replace every 1-3 months depending on filter type and pets/allergies. A dirty filter strains the system and reduces air quality.' },
      { title: 'Annual HVAC Tune-Up (Cooling)', frequency: 'Annual', notes: 'Schedule a professional inspection each spring before summer heat hits. Technician checks refrigerant, coils, electrical connections, and thermostat calibration.' },
      { title: 'Annual HVAC Tune-Up (Heating)', frequency: 'Annual', notes: 'Schedule a professional inspection each fall before winter. Technician checks heat exchanger, burners, and safety controls.' },
      { title: 'Clean AC Condensate Drain Line', frequency: 'Quarterly', notes: 'Pour a cup of diluted bleach or vinegar down the drain line to prevent clogs and mold buildup. A clogged drain can cause water damage.' },
      { title: 'Clear Debris Around Outdoor Unit', frequency: 'Seasonal', notes: 'Keep at least 2 feet of clearance around the outdoor condenser unit. Remove leaves, grass clippings, and debris that restrict airflow.' },
      { title: 'Test Thermostat', frequency: 'Seasonal', notes: 'Test heating and cooling modes at each season change. Replace batteries in programmable thermostats annually.' },
    ],
  },
  plumbing: {
    title: 'Plumbing',
    icon: '🔧',
    tips: 'Plumbing issues are among the most costly home repairs. Regular inspections catch small leaks before they become major water damage.',
    tasks: [
      { title: 'Check for Leaks Under Sinks', frequency: 'Monthly', notes: 'Inspect under all sinks for moisture, drips, or staining. Early detection prevents mold and cabinet damage.' },
      { title: 'Test Water Pressure', frequency: 'Quarterly', notes: 'Normal water pressure is 40-80 PSI. High pressure stresses pipes and appliances. Install a pressure gauge on an outdoor hose bib to check.' },
      { title: 'Flush Water Heater', frequency: 'Annual', notes: 'Drain 1-2 gallons from the water heater to remove sediment buildup. Sediment reduces efficiency and shortens tank life. Most tanks last 8-12 years.' },
      { title: 'Inspect Toilet for Running Water', frequency: 'Quarterly', notes: 'Add food coloring to the tank — if color appears in the bowl without flushing, the flapper needs replacing. A running toilet wastes up to 200 gallons per day.' },
      { title: 'Clean Showerhead and Faucet Aerators', frequency: 'Annual', notes: 'Soak in vinegar to dissolve mineral deposits. Clogged aerators reduce water flow and pressure.' },
      { title: 'Locate and Label Water Shutoff Valves', frequency: 'Annual', notes: 'Know where your main shutoff and individual fixture shutoffs are. In a leak emergency, quick shutoff saves thousands in damage.' },
    ],
  },
  exterior: {
    title: 'Exterior',
    icon: '🏡',
    tips: 'Your home\'s exterior is its first line of defense against weather. Regular inspection and maintenance prevents water intrusion, structural damage, and costly repairs.',
    tasks: [
      { title: 'Inspect Roof for Damage', frequency: 'Annual', notes: 'Look for missing, cracked, or curling shingles. Check flashing around chimneys, vents, and skylights. Best done after major storms. Hire a professional for a thorough inspection every 3-5 years.' },
      { title: 'Clean Gutters and Downspouts', frequency: 'Seasonal', notes: 'Clear gutters of leaves and debris each spring and fall. Clogged gutters cause water to back up under roofing and damage fascia. Ensure downspouts direct water at least 6 feet from foundation.' },
      { title: 'Inspect and Caulk Windows and Doors', frequency: 'Annual', notes: 'Check caulk and weatherstripping around all windows and doors. Cracked or missing caulk allows water and air infiltration, increasing energy costs.' },
      { title: 'Pressure Wash Exterior', frequency: 'Annual', notes: 'Clean siding, driveway, walkways, and deck to remove dirt, mold, and mildew. Prevents long-term staining and deterioration.' },
      { title: 'Inspect Foundation for Cracks', frequency: 'Annual', notes: 'Walk around the foundation looking for new or widening cracks. Horizontal cracks are more serious than vertical ones. Fill small cracks with hydraulic cement or epoxy.' },
      { title: 'Check Driveway and Walkways', frequency: 'Annual', notes: 'Fill cracks in concrete or asphalt to prevent water from expanding them. Seal asphalt driveways every 2-3 years.' },
    ],
  },
  electrical: {
    title: 'Electrical',
    icon: '⚡',
    tips: 'Electrical issues are a leading cause of house fires. Never ignore flickering lights, tripping breakers, or burning smells — these require immediate professional attention.',
    tasks: [
      { title: 'Test GFCI Outlets', frequency: 'Monthly', notes: 'Press the "Test" button on GFCI outlets in bathrooms, kitchen, garage, and outdoors. The outlet should lose power. Press "Reset" to restore. Replace any that don\'t trip or reset.' },
      { title: 'Test Arc Fault Circuit Interrupters (AFCIs)', frequency: 'Quarterly', notes: 'AFCIs protect against electrical fires from damaged wiring. Test using the Test button on the breaker. Required in bedrooms by modern code.' },
      { title: 'Inspect Electrical Panel', frequency: 'Annual', notes: 'Look for signs of corrosion, burnt smells, or double-tapped breakers. Have a licensed electrician inspect the panel every 5-10 years or if you notice any issues.' },
      { title: 'Check Outdoor Outlets and Lighting', frequency: 'Seasonal', notes: 'Inspect outdoor outlets for moisture damage and ensure covers are properly sealed. Check that exterior lighting is working and bulbs are weather-rated.' },
      { title: 'Inspect Extension Cords and Power Strips', frequency: 'Annual', notes: 'Replace any cords with frayed insulation, bent prongs, or damaged connectors. Never run extension cords under rugs or through walls. Use surge protectors for electronics.' },
    ],
  },
  safety: {
    title: 'Safety',
    icon: '🛡️',
    tips: 'Working smoke and carbon monoxide detectors save lives. Keep emergency supplies stocked and make sure every family member knows your home\'s emergency plan.',
    tasks: [
      { title: 'Test Smoke Detectors', frequency: 'Monthly', notes: 'Press and hold the test button until the alarm sounds. Replace batteries annually (or use 10-year sealed battery models). Replace the entire unit every 10 years.' },
      { title: 'Test Carbon Monoxide Detectors', frequency: 'Monthly', notes: 'Test using the test button. CO detectors should be on every level and near sleeping areas. Replace every 5-7 years — they have a chemical sensor that degrades over time.' },
      { title: 'Check Fire Extinguisher', frequency: 'Annual', notes: 'Verify the pressure gauge needle is in the green zone. Check for physical damage or corrosion. Have it professionally inspected every 6 years and replaced or recharged as needed.' },
      { title: 'Review Home Emergency Plan', frequency: 'Annual', notes: 'Ensure all family members know two exit routes from every room, the meeting point outside, and emergency contacts. Practice a fire drill with children.' },
      { title: 'Inspect Door and Window Locks', frequency: 'Quarterly', notes: 'Test all locks for smooth operation. Lubricate with graphite spray if stiff. Consider upgrading to deadbolts if not already installed.' },
      { title: 'Check Emergency Supply Kit', frequency: 'Annual', notes: 'Restock water (1 gallon per person per day for 3 days), food, flashlights, batteries, first aid kit, medications, and important documents. Check expiration dates.' },
    ],
  },
  insurance: {
    title: 'Insurance',
    icon: '📋',
    tips: 'Your homeowner\'s insurance policy should reflect the actual replacement cost of your home and belongings. Review it annually and after any major improvements.',
    tasks: [
      { title: 'Review Homeowner\'s Insurance Policy', frequency: 'Annual', notes: 'Compare your coverage limits to current rebuilding costs in your area. Costs have risen significantly — many homeowners are underinsured. Contact your agent to discuss coverage gaps.' },
      { title: 'Update Home Inventory', frequency: 'Annual', notes: 'Walk through your home and document valuables with photos or video. Store the inventory in the cloud or off-site. This is essential for filing accurate claims after theft or disaster.' },
      { title: 'Review Flood Insurance', frequency: 'Annual', notes: 'Standard homeowner\'s policies do NOT cover flooding. Check your flood zone status (FEMA\'s flood map) and consider NFIP or private flood insurance, especially in coastal or low-lying areas.' },
      { title: 'Check Deductibles and Riders', frequency: 'Annual', notes: 'Confirm your deductible amounts for standard claims vs. named-storm or wind events. Add scheduled personal property riders for jewelry, art, or electronics that exceed standard limits.' },
    ],
  },
  pest: {
    title: 'Pest Control',
    icon: '🐜',
    tips: 'Prevention is far cheaper than treatment. Seal entry points, eliminate moisture, and maintain a pest control schedule before infestations take hold.',
    tasks: [
      { title: 'Quarterly Pest Control Treatment', frequency: 'Quarterly', notes: 'Schedule professional perimeter treatment every 3 months. Covers common pests: ants, roaches, spiders, and rodents. More frequent treatment may be needed in humid climates.' },
      { title: 'Inspect for Termites', frequency: 'Annual', notes: 'Look for mud tubes along foundation, hollow-sounding wood, or discarded wings near windows. Annual professional termite inspection is strongly recommended, especially in the South.' },
      { title: 'Seal Entry Points', frequency: 'Annual', notes: 'Caulk gaps around pipes, wires, and conduits where they enter the home. Install door sweeps and repair damaged screens. Even a dime-sized gap can let mice in.' },
      { title: 'Check for Moisture Issues', frequency: 'Seasonal', notes: 'Pests thrive where moisture collects. Fix leaky pipes, ensure proper drainage away from foundation, and use a dehumidifier in crawl spaces or basements.' },
      { title: 'Rodent Prevention Check', frequency: 'Seasonal', notes: 'Look for droppings, gnaw marks, or nesting materials in attic, garage, and under sinks. Set traps proactively in fall when rodents seek warmth indoors.' },
    ],
  },
  irrigation: {
    title: 'Irrigation',
    icon: '💧',
    tips: 'A properly maintained irrigation system uses up to 50% less water than manual watering. Regular checks prevent leaks that can dramatically increase your water bill.',
    tasks: [
      { title: 'Inspect Sprinkler Heads', frequency: 'Monthly', notes: 'Check for clogged, broken, or misaligned heads. A broken sprinkler head wastes hundreds of gallons per month. Adjust heads to avoid watering sidewalks and driveways.' },
      { title: 'Check Controller/Timer Settings', frequency: 'Seasonal', notes: 'Adjust watering schedules each season. Water deeply and infrequently (2-3 times per week in summer, less in cooler months). Most systems over-water when left on default settings.' },
      { title: 'Inspect Drip Lines and Emitters', frequency: 'Quarterly', notes: 'Check drip irrigation emitters for clogs or damage. Flush the system periodically. Replace emitters that are cracked or delivering uneven water flow.' },
      { title: 'Winterize Irrigation System', frequency: 'Annual', notes: 'Blow out all water from lines before first freeze to prevent pipe bursts. Relevant for Midwest and Northeast — not required in Florida/Southeast.' },
      { title: 'Spring System Startup', frequency: 'Annual', notes: 'Turn system back on slowly after winter. Check all zones for proper coverage. Test the rain sensor to ensure it shuts off the system during rainfall.' },
    ],
  },
  weather: {
    title: 'Weather Emergency',
    icon: '🌪️',
    tips: 'Preparation before a weather emergency is the difference between minor inconvenience and major loss. Have a plan, know your risks, and don\'t wait until a storm is imminent.',
    tasks: [],
    regional: {
      southeast: {
        name: 'Florida / Southeast — Hurricane Prep',
        tips: 'Hurricane season runs June 1 through November 30. The time to prepare is before a storm is named — not when it\'s 48 hours away.',
        tasks: [
          { title: 'Hurricane Season Kickoff Inspection', frequency: 'Annual', notes: 'Each May, inspect shutters/panels, generator, fuel supply, and emergency kit. Test the generator under load. Confirm your insurance covers wind and flood events.' },
          { title: 'Install/Inspect Hurricane Shutters or Impact Windows', frequency: 'Annual', notes: 'Ensure all shutters are in working order and hardware is not corroded. Know which panels go where before a storm warning is issued. Impact windows require no action but inspect for seal integrity.' },
          { title: 'Trim Trees and Shrubs', frequency: 'Seasonal', notes: 'Trim dead branches and overhanging limbs before hurricane season (May) and again mid-season. Flying debris is the #1 cause of storm damage.' },
          { title: 'Test and Fuel Generator', frequency: 'Seasonal', notes: 'Run your generator monthly under load. Store enough fuel for 5-7 days. Rotate fuel with a stabilizer. Never run a generator indoors or in the garage.' },
          { title: 'Stock Hurricane Emergency Supplies', frequency: 'Annual', notes: 'Minimum 7-day supply: water (1 gal/person/day), non-perishable food, medications, battery/hand-crank radio, flashlights, cash, phone chargers, important documents in waterproof bag.' },
          { title: 'Review Evacuation Routes', frequency: 'Annual', notes: 'Know your county\'s evacuation zones (check local emergency management website). Identify two evacuation routes and a destination. Pre-register pets if sheltering with animals.' },
          { title: 'Secure Outdoor Furniture and Items', frequency: 'Seasonal', notes: 'Before any named storm, bring all outdoor furniture, grills, planters, and decorations inside or secure with straps. Unsecured items become dangerous projectiles at hurricane wind speeds.' },
          { title: 'Check Garage Door Bracing', frequency: 'Annual', notes: 'Garage doors are the most vulnerable point in a hurricane. Ensure your door is rated for high winds or install a bracing kit. An un-braced door can fail and cause the roof to lift.' },
          { title: 'Inspect Roof and Attic', frequency: 'Annual', notes: 'Hire a roofer to inspect before hurricane season. Ensure all shingles, tiles, and flashing are secure. Check attic for proper hurricane straps connecting roof structure to walls.' },
          { title: 'Document Home and Belongings', frequency: 'Annual', notes: 'Walk through with video before hurricane season begins. Store video in cloud storage. Essential for insurance claims after storm damage.' },
        ],
      },
      midwest: {
        name: 'Midwest — Tornado & Winter Storm Prep',
        tips: 'The Midwest faces tornado season (spring/summer) and severe winter storms. Prepare for both and know your local warning systems.',
        tasks: [
          { title: 'Test Tornado Safe Room or Shelter', frequency: 'Annual', notes: 'Locate your safest shelter area (lowest floor, interior room, away from windows). Stock it with a battery radio, flashlight, water, and shoes. Know the difference between a Tornado Watch and Warning.' },
          { title: 'Register for Local Emergency Alerts', frequency: 'Annual', notes: 'Sign up for your county\'s Wireless Emergency Alerts and text/email notification system. Have a NOAA weather radio with battery backup in your home.' },
          { title: 'Inspect Sump Pump Before Spring', frequency: 'Annual', notes: 'Test sump pump each March by pouring water into the pit. Clean the inlet screen. Consider a battery backup sump pump for power outage protection during heavy spring rains.' },
          { title: 'Winterize Exterior Pipes and Faucets', frequency: 'Annual', notes: 'Before first freeze (October/November), disconnect and drain garden hoses. Shut off and drain exterior faucet lines. Insulate pipes in unheated spaces like garages and crawl spaces.' },
          { title: 'Stock Winter Emergency Supplies', frequency: 'Annual', notes: 'Keep in your home: rock salt, snow shovel, ice melt, battery-powered carbon monoxide detector, extra blankets, backup heating source (approved for indoor use), 3-day food and water supply.' },
          { title: 'Stock Winter Car Emergency Kit', frequency: 'Annual', notes: 'Keep in each vehicle: ice scraper, jumper cables, blanket, sand or kitty litter for traction, small shovel, flashlight, and energy bars. Check antifreeze and tire pressure as temperatures drop.' },
          { title: 'Service Snowblower Before Winter', frequency: 'Annual', notes: 'Each October, change the oil, replace spark plugs, check belts and skid plates, and add fuel stabilizer. A snowblower that won\'t start during a blizzard is useless.' },
          { title: 'Inspect and Clean Fireplace/Chimney', frequency: 'Annual', notes: 'Have chimney professionally cleaned and inspected before heating season. Creosote buildup is a leading cause of house fires. Install a chimney cap to keep animals and debris out.' },
          { title: 'Check Attic Insulation and Ventilation', frequency: 'Annual', notes: 'Proper attic insulation prevents ice dams — ridges of ice that form at the roof edge and back water under shingles. Ensure attic vents are clear and insulation is at least R-49 in cold climates.' },
        ],
      },
      northeast: {
        name: 'Northeast — Winter Storm & Nor\'easter Prep',
        tips: 'Nor\'easters, ice storms, and heavy snowfall are major threats. Prepare your home before Thanksgiving — once storms hit, it\'s too late.',
        tasks: [
          { title: 'Winterize Pipes Before First Freeze', frequency: 'Annual', notes: 'Insulate pipes in attics, crawl spaces, and exterior walls. Know where your main water shutoff is. Keep cabinet doors under sinks open during extreme cold to let warm air reach pipes.' },
          { title: 'Inspect Roof for Snow Load Capacity', frequency: 'Annual', notes: 'Have your roof inspected before winter. Know the snow load limit. After heavy snowfall (over 6 inches of wet snow), consider a roof rake to reduce weight. A collapsed roof is a life-safety emergency.' },
          { title: 'Check Heating System Before Winter', frequency: 'Annual', notes: 'Service oil, gas, or propane heating system each October. Replace filters, check fuel supply, and test emergency shutoff. Schedule delivery before demand peaks and prices rise.' },
          { title: 'Stock Heating Fuel Supply', frequency: 'Annual', notes: 'Order oil or propane before October. Keep tank at least half full throughout winter. Know your average burn rate so you don\'t run out during a storm when delivery may be delayed.' },
          { title: 'Ice Dam Prevention', frequency: 'Annual', notes: 'Ensure attic is properly insulated and ventilated to keep roof surface cold and prevent uneven melting. Install heat cables in problem areas. After major snowfall, use a roof rake to remove snow from the first 3-4 feet of roof edge.' },
          { title: 'Service Snowblower Before Winter', frequency: 'Annual', notes: 'Each October, change the oil, replace spark plugs, check belts and impeller, and add fuel stabilizer. Test run before the first storm. Keep extra shear pins on hand.' },
          { title: 'Inspect and Clean Chimney', frequency: 'Annual', notes: 'Have chimney professionally swept and inspected before heating season. Creosote and bird nests are fire hazards. Install a chimney cap and damper if not already in place.' },
          { title: 'Prepare Nor\'easter Emergency Kit', frequency: 'Annual', notes: 'Stock: 3-7 day food and water supply, battery/hand-crank radio, flashlights, extra batteries, blankets, backup battery packs, cash, and a manual can opener. Fill prescriptions before major storms.' },
          { title: 'Check Generator and Alternative Heat', frequency: 'Annual', notes: 'Test generator under load before winter. Stock fuel with stabilizer. Have an approved indoor-safe alternative heat source (propane heater with proper ventilation). Never use generators or charcoal indoors.' },
          { title: 'Inspect Foundation and Basement for Water Entry', frequency: 'Annual', notes: 'Check basement walls and floor for cracks before spring thaw. Apply waterproofing sealant to minor cracks. Ensure sump pump is working and has a battery backup for storm power outages.' },
        ],
      },
    },
  },
}
