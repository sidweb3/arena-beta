import { query } from "./_generated/server";

export const getLandingStats = query({
  args: {},
  handler: async (ctx) => {
    // In a production app with millions of records, you would use dedicated counter documents 
    // updated via mutations. For this demo, we'll count the documents directly.
    
    const agents = await ctx.db.query("agents").collect();
    const duels = await ctx.db.query("duels").collect();
    const bets = await ctx.db.query("bets").collect();

    const totalVolume = bets.reduce((acc, bet) => acc + bet.amount, 0);
    
    return {
      activeAgents: agents.length,
      totalDuels: duels.length,
      totalVolume: totalVolume,
      // Mock APY for now as it requires complex historical calculation
      avgApy: 142, 
    };
  },
});