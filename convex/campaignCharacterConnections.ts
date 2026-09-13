import type { Id } from './_generated/dataModel';

interface CampaignMemberCharacterLinks {
	userId: Id<'users'>;
	sharedCharacterIds: string[];
	sharedCharacterDocIds?: Id<'characters'>[];
}

interface CharacterIdentity {
	_id: Id<'characters'>;
	id: string;
	userId: Id<'users'>;
	deletedAt?: string;
}

export function memberReferencesCharacter(
	member: CampaignMemberCharacterLinks,
	character: CharacterIdentity
): boolean {
	if (member.sharedCharacterDocIds !== undefined) {
		return member.sharedCharacterDocIds.includes(character._id);
	}
	return member.sharedCharacterIds.includes(character.id);
}

export async function findOwnedCharacterByAppId(
	ctx: any,
	ownerUserId: Id<'users'>,
	characterId: string
) {
	return ctx.db
		.query('characters')
		.withIndex('by_user_and_id', (q: any) => q.eq('userId', ownerUserId).eq('id', characterId))
		.filter((q: any) => q.eq(q.field('deletedAt'), undefined))
		.first();
}

export async function listConnectedCharacters(
	ctx: any,
	member: CampaignMemberCharacterLinks
): Promise<any[]> {
	const characters: any[] = [];

	if (member.sharedCharacterDocIds !== undefined) {
		for (const characterDocId of member.sharedCharacterDocIds) {
			const character = await ctx.db.get(characterDocId);
			if (!character || character.deletedAt || character.userId !== member.userId) continue;
			characters.push(character);
		}
		return characters;
	}

	for (const characterId of member.sharedCharacterIds) {
		const character = await findOwnedCharacterByAppId(ctx, member.userId, characterId);
		if (character) characters.push(character);
	}

	return characters;
}

export async function resolveConnectedCharacter(
	ctx: any,
	member: CampaignMemberCharacterLinks,
	characterId: string
) {
	if (member.sharedCharacterDocIds !== undefined) {
		for (const characterDocId of member.sharedCharacterDocIds) {
			const character = await ctx.db.get(characterDocId);
			if (
				character &&
				!character.deletedAt &&
				character.userId === member.userId &&
				character.id === characterId
			) {
				return character;
			}
		}
		return null;
	}

	if (!member.sharedCharacterIds.includes(characterId)) return null;
	return findOwnedCharacterByAppId(ctx, member.userId, characterId);
}

export async function materializeCharacterDocIds(
	ctx: any,
	member: CampaignMemberCharacterLinks
): Promise<Id<'characters'>[]> {
	if (member.sharedCharacterDocIds !== undefined) return member.sharedCharacterDocIds;

	const characterDocIds: Id<'characters'>[] = [];
	for (const characterId of member.sharedCharacterIds) {
		const character = await findOwnedCharacterByAppId(ctx, member.userId, characterId);
		if (character && !characterDocIds.includes(character._id)) {
			characterDocIds.push(character._id);
		}
	}
	return characterDocIds;
}

export async function resolveConnectedCharacterByDocId(
	ctx: any,
	member: CampaignMemberCharacterLinks,
	characterDocId: Id<'characters'>,
	characterId: string
) {
	const character = await ctx.db.get(characterDocId);
	if (
		!character ||
		character.deletedAt ||
		character.userId !== member.userId ||
		character.id !== characterId
	) {
		return null;
	}

	if (member.sharedCharacterDocIds !== undefined) {
		return member.sharedCharacterDocIds.includes(characterDocId) ? character : null;
	}

	return member.sharedCharacterIds.includes(character.id) ? character : null;
}
