# ADR-001: Turborepo vs NX for Monorepo Management

**Status**: ✅ Accepted  
**Date**: 2026-07-13  
**Deciders**: Architecture Team  

---

## Context

We need a monorepo tool to manage our 9 micro frontend applications and 10 shared packages. The two leading options are **Turborepo** and **NX**.

Both tools provide:
- Task orchestration across workspaces
- Intelligent caching
- Parallel execution
- Dependency graph management

---

## Decision

We will use **Turborepo** for monorepo management.

---

## Rationale

### Turborepo Advantages

1. **Simplicity**
   - Minimal configuration (~50 lines in turbo.json)
   - Easy to understand for new team members
   - Less cognitive overhead

2. **Performance**
   - Excellent local and remote caching
   - Fast incremental builds
   - Efficient task scheduling

3. **Developer Experience**
   - Simple mental model (pipeline-based)
   - Great documentation
   - Low learning curve

4. **JSON Configuration**
   - Easy to read and modify
   - No code generation needed
   - Version control friendly

5. **Team Size Fit**
   - Perfect for 5-20 developers
   - Adequate for our project scale (9 apps + 10 packages)

6. **Interview Friendly**
   - Easier to explain in interviews
   - Growing adoption in industry
   - Modern, well-regarded tool

### NX Considerations (Why Not Chosen)

1. **Complexity**
   - Steeper learning curve
   - More concepts to learn (affected detection, nx.json, project.json, workspace.json)
   - Code generation can feel like "magic"

2. **Configuration Overhead**
   - Can require 200+ lines of configuration
   - More moving parts to maintain

3. **Team Size**
   - Better suited for 20-200 developers
   - Overkill for our current needs

4. **Plugin Ecosystem**
   - While rich, adds complexity
   - Not all plugins are needed for our use case

### Comparison Table

| Feature | Turborepo | NX |
|---------|-----------|-----|
| **Learning Curve** | ⭐⭐⭐⭐⭐ Easy | ⭐⭐⭐ Moderate |
| **Configuration** | ~50 lines | 200+ lines |
| **Build Speed** | Excellent | Excellent |
| **Caching** | Local + Remote | Local + Remote |
| **Affected Detection** | Basic | Advanced |
| **Code Generation** | No | Yes |
| **MFE Support** | Manual setup | Built-in generators |
| **Team Size Sweet Spot** | 5-20 devs | 20-200 devs |
| **Documentation** | Excellent | Excellent |
| **Community** | Growing | Mature |

---

## Consequences

### Positive

✅ **Faster onboarding** - New developers can understand the setup quickly  
✅ **Less maintenance** - Fewer configuration files to maintain  
✅ **Better for interviews** - Easier to explain and justify  
✅ **Adequate performance** - Caching and parallel execution meet our needs  
✅ **JSON-based config** - Easy to read and modify  

### Negative

❌ **Manual Module Federation setup** - Need to configure manually (vs NX generators)  
❌ **Less advanced affected detection** - Basic dependency tracking  
❌ **Fewer built-in tools** - No code generators or migration tools  

### Mitigation

- **Module Federation**: We'll create our own templates and scripts
- **Affected Detection**: Turborepo's basic detection is sufficient for our scale
- **Tooling**: We'll document patterns and create our own scaffolding scripts if needed

---

## Alternatives Considered

### 1. NX
- **Pros**: More features, better for large teams, built-in MFE support
- **Cons**: Steeper learning curve, more complex, overkill for our scale
- **Decision**: Not chosen due to complexity vs value trade-off

### 2. Lerna
- **Pros**: Mature, widely used
- **Cons**: Slower than modern tools, less powerful caching, declining adoption
- **Decision**: Not chosen due to performance and modern alternatives

### 3. Yarn/npm Workspaces Only
- **Pros**: Minimal tooling, built into package managers
- **Cons**: No task orchestration, no caching, no parallel execution
- **Decision**: Not chosen due to lack of build optimization

### 4. Rush
- **Pros**: Good for large enterprises, strict policies
- **Cons**: Less popular, Microsoft-specific patterns, steeper learning curve
- **Decision**: Not chosen due to lower adoption and documentation

---

## Implementation

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

---

## Success Metrics

- ✅ Build time < 5 minutes for full monorepo
- ✅ Incremental builds < 30 seconds
- ✅ New developer can run project within 15 minutes
- ✅ Cache hit rate > 80%

---

## References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [NX Documentation](https://nx.dev/)
- [Monorepo Tools Comparison](https://monorepo.tools/)
- [Vercel Turborepo Announcement](https://vercel.com/blog/vercel-acquires-turborepo)

---

## Notes

If the project grows to 50+ packages and 30+ developers, we should revisit this decision and consider migrating to NX. However, for the current scope and team size, Turborepo is the optimal choice.

---

**Reviewed By**: Senior Frontend Architect  
**Next Review Date**: 2027-01-01 (6 months)
