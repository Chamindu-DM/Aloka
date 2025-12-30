import pool from "../config/db.js";

const seedCampaigns = async () => {
    // Check if campaigns already exist
    const existingCampaigns = await pool.query('SELECT COUNT(*) FROM campaigns');
    if (parseInt(existingCampaigns.rows[0].count) > 0) {
        console.log("ℹ️  Campaigns already seeded, skipping...");
        return;
    }

    const campaigns = [
        {
            user_id: 1,
            title: "Help Rebuild Rural Schools After Floods",
            description: "Support the reconstruction of schools damaged by recent floods in the Southern Province. Our goal is to rebuild classrooms and provide essential learning materials for over 500 students.",
            image: "https://images.unsplash.com/photo-1761604478724-13fe879468cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjI1NzgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
            raised: 850000,
            goal: 1200000,
            donors: 342,
            category: "Education",
            location: "Matara, Southern Province",
            days_left: 28,
            is_urgent: false,
            is_featured: true,
            organizer: "Education Trust Sri Lanka"
        },
        {
            user_id: 1,
            title: "Support Amaya's Heart Surgery",
            description: "5-year-old Amaya needs urgent heart surgery to survive. Her family cannot afford the cost. Every donation brings her closer to a healthy life.",
            image: "https://images.unsplash.com/photo-1613377512409-59c33c10c821?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FyZSUyMGhvc3BpdGFsfGVufDF8fHx8MTc2MjU3ODEzOXww&ixlib=rb-4.1.0&q=80&w=1080",
            raised: 425000,
            goal: 500000,
            donors: 189,
            category: "Medical",
            location: "Colombo",
            days_left: 12,
            is_urgent: true,
            is_featured: false,
            organizer: "Amaya's Family"
        },
        {
            user_id: 1,
            title: "Community Well Project - Anuradhapura",
            description: "Bring clean drinking water to a rural village in Anuradhapura. This well will serve over 200 families who currently walk miles for water.",
            image: "https://images.unsplash.com/photo-1728038024967-69afb838f5ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBidWlsZGluZyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NjI1NzgxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
            raised: 320000,
            goal: 400000,
            donors: 156,
            category: "Community",
            location: "Anuradhapura",
            days_left: 45,
            is_urgent: false,
            is_featured: false,
            organizer: "Rural Development Foundation"
        },
        {
            user_id: 1,
            title: "Provide Meals for Underprivileged Children",
            description: "Help us provide nutritious meals to children in need. Your donation ensures that no child goes to bed hungry in our community.",
            image: "https://images.unsplash.com/photo-1574309122960-34273ebda15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMGNlbGVicmF0aW5nfGVufDF8fHx8MTc2MjU3ODE0MHww&ixlib=rb-4.1.0&q=80&w=1080",
            raised: 680000,
            goal: 750000,
            donors: 421,
            category: "Social",
            location: "Kandy",
            days_left: 20,
            is_urgent: false,
            is_featured: true,
            organizer: "Hope for Children LK"
        },
        {
            user_id: 1,
            title: "Emergency Relief for Flood Victims",
            description: "Immediate relief needed for families affected by severe flooding in Galle. Funds will provide food, shelter, and medical supplies.",
            image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZnxlbnwxfHx8fDE3MzE1MDk5Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
            raised: 1250000,
            goal: 2000000,
            donors: 634,
            category: "Emergency",
            location: "Galle",
            days_left: 7,
            is_urgent: true,
            is_featured: true,
            organizer: "Red Cross Sri Lanka"
        },
        {
            user_id: 1,
            title: "Scholarship Fund for Rural Students",
            description: "Support bright students from rural areas to pursue higher education. Your contribution can change a young person's life forever.",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nfGVufDF8fHx8MTczMTUwOTkzMHww&ixlib=rb-4.1.0&q=80&w=1080",
            raised: 450000,
            goal: 800000,
            donors: 198,
            category: "Education",
            location: "Badulla",
            days_left: 35,
            is_urgent: false,
            is_featured: false,
            organizer: "Future Leaders Foundation"
        },
        {
            user_id: 1,
            title: "Medical Equipment for Rural Clinic",
            description: "Help equip a rural clinic in Jaffna with essential medical equipment. This will provide healthcare access to thousands of villagers.",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50fGVufDF8fHx8MTczMTUwOTkzMXww&ixlib=rb-4.1.0&q=80&w=1080",
            raised: 720000,
            goal: 1000000,
            donors: 289,
            category: "Medical",
            location: "Jaffna",
            days_left: 25,
            is_urgent: false,
            is_featured: false,
            organizer: "Healthcare Access Initiative"
        },
        {
            user_id: 1,
            title: "Support Small Business Recovery",
            description: "Help small business owners in Negombo recover from economic hardships. Your support will help restore livelihoods.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzfGVufDF8fHx8MTczMTUwOTkzMXww&ixlib=rb-4.1.0&q=80&w=1080",
            raised: 380000,
            goal: 600000,
            donors: 145,
            category: "Economic",
            location: "Negombo",
            days_left: 40,
            is_urgent: false,
            is_featured: false,
            organizer: "Small Business Alliance"
        }
    ];

    try {
        for (const campaign of campaigns) {
            await pool.query(
                `INSERT INTO campaigns (user_id, title, description, image, raised, goal, donors, category, location, days_left, is_urgent, is_featured, organizer)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                [campaign.user_id, campaign.title, campaign.description, campaign.image, campaign.raised, campaign.goal, campaign.donors, campaign.category, campaign.location, campaign.days_left, campaign.is_urgent, campaign.is_featured, campaign.organizer]
            );
        }
        console.log("✅ Campaigns seeded successfully!");
    } catch (error) {
        console.error("❌ Error seeding campaigns:", error.message);
    }
};

const seedDonations = async () => {
    // Check if donations already exist
    const existingDonations = await pool.query('SELECT COUNT(*) FROM donations');
    if (parseInt(existingDonations.rows[0].count) > 0) {
        console.log("ℹ️  Donations already seeded, skipping...");
        return;
    }

    const donations = [
        { user_id: 1, campaign_id: 1, amount: 10000, donor_name: "Anonymous", is_anonymous: true, message: "Keep up the great work!" },
        { user_id: 1, campaign_id: 2, amount: 5000, donor_name: "Priya Fernando", is_anonymous: false, message: "Wishing Amaya a speedy recovery" },
        { user_id: 1, campaign_id: 5, amount: 15000, donor_name: "Rajith Silva", is_anonymous: false, message: "Stay strong!" },
        { user_id: 1, campaign_id: 4, amount: 25000, donor_name: "Anonymous", is_anonymous: true, message: "For the children" },
        { user_id: 1, campaign_id: 1, amount: 7500, donor_name: "Malini Perera", is_anonymous: false, message: "Education is the key" },
        { user_id: 1, campaign_id: 3, amount: 12000, donor_name: "Sunil Jayawardena", is_anonymous: false, message: "Clean water for all" },
        { user_id: 1, campaign_id: 6, amount: 20000, donor_name: "Anonymous", is_anonymous: true, message: "" },
        { user_id: 1, campaign_id: 7, amount: 30000, donor_name: "Dr. Chaminda", is_anonymous: false, message: "Healthcare is essential" },
    ];

    try {
        for (const donation of donations) {
            await pool.query(
                `INSERT INTO donations (user_id, campaign_id, amount, donor_name, is_anonymous, message)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [donation.user_id, donation.campaign_id, donation.amount, donation.donor_name, donation.is_anonymous, donation.message]
            );
        }
        console.log("✅ Donations seeded successfully!");
    } catch (error) {
        console.error("❌ Error seeding donations:", error.message);
    }
};

export { seedCampaigns, seedDonations };

