import { query } from "./_generated/server";

export const getLandingStats = query({
  args: {},
  handler: async (ctx) => {
    // In a production app with millions of records, you would use dedicated counter documents 
    // updated via mutations. For this demo, we'll count the documents directly.
    
    let agentsCount = 0;
    let duelsCount = 0;
    let totalVolume = 0;

    try {
      const agents = await ctx.db.query("agents").collect();
      agentsCount = agents.length;
      
      const duels = await ctx.db.query("duels").collect();
      duelsCount = duels.length;
      
      const bets = await ctx.db.query("bets").collect();
      totalVolume = bets.reduce((acc, bet) => acc + bet.amount, 0);
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Fallback to 0 or mock data if needed
    }
    
    // Simulate real-time Linera blockchain metrics
    const currentTime = Date.now();
    const mockBlockHeight = Math.floor(currentTime / 10000) + 100000; // Increments every 10 seconds
    const mockTPS = Math.floor(50 + Math.random() * 150); // 50-200 TPS
    const mockValidators = 4;
    
    return {
      activeAgents: agentsCount,
      totalDuels: duelsCount,
      totalVolume: totalVolume,
      // Mock APY for now as it requires complex historical calculation
      avgApy: 142,
      // Real-time Linera blockchain stats
      linera: {
        blockHeight: mockBlockHeight,
        tps: mockTPS,
        validators: mockValidators,
        chainId: "linera-testnet-mock-1",
        lastBlockTime: currentTime,
      }
    };
  },
});