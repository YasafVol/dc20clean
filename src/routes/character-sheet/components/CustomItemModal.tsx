import React, { useState } from 'react';
import {
    StyledFeaturePopupOverlay,
    StyledFeaturePopupContent,
    StyledFeaturePopupHeader,
    StyledFeaturePopupTitle,
    StyledFeaturePopupClose,
    StyledFeaturePopupDescription
} from '../styles/FeaturePopup';
import type { InventoryItem } from '../../../lib/rulesdata/inventoryItems';
import { ItemType, WeaponType, WeaponHandedness, WeaponStyle } from '../../../lib/rulesdata/inventoryItems';
import { addCustomItem } from '../../../lib/utils/storageUtils';

interface Props {
    onClose: () => void;
    onSave: (item: InventoryItem) => void; // will also be added to character inventory
}

const CustomItemModal: React.FC<Props> = ({ onClose, onSave }) => {
    const [itemType, setItemType] = useState<ItemType | ''>('');
    const [name, setName] = useState('');

    // Weapon fields (basic subset)
    const [weaponType, setWeaponType] = useState<WeaponType>(WeaponType.Melee);
    const [handedness, setHandedness] = useState<WeaponHandedness>(WeaponHandedness.OneHanded);
    const [style, setStyle] = useState<WeaponStyle | ''>('');
    const [damage, setDamage] = useState('1 S');
    const [versatileDamage, setVersatileDamage] = useState('2 S');
    const [properties, setProperties] = useState('');
    const [features, setFeatures] = useState('');

    const handleSave = () => {
        if (!itemType || !name) return;

        let item: any = { itemType, name };

        if (itemType === ItemType.Weapon) {
            item = {
                itemType: ItemType.Weapon,
                name,
                type: weaponType,
                style: style || WeaponStyle.Hammer,
                handedness,
                damage,
                properties: properties ? properties.split(',').map((s) => s.trim()) : []
            };
        } else {
            // Basic generic item representation
            item = {
                itemType,
                name,
                description: features || undefined,
                price: undefined
            };
        }

        try {
            addCustomItem(item as InventoryItem);
        } catch (e) {
            // ignore
        }

        onSave(item as InventoryItem);
        onClose();
    };

    return (
        <StyledFeaturePopupOverlay onClick={onClose}>
            <StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
                <StyledFeaturePopupHeader>
                    <StyledFeaturePopupTitle>Add Custom Item</StyledFeaturePopupTitle>
                    <StyledFeaturePopupClose onClick={onClose}>×</StyledFeaturePopupClose>
                </StyledFeaturePopupHeader>
                <StyledFeaturePopupDescription>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <label>
                            Type
                            <select value={itemType} onChange={(e) => setItemType(e.target.value as any)}>
                                <option value="">Select Type</option>
                                <option value={ItemType.Weapon}>Weapon</option>
                                <option value={ItemType.Armor}>Armor</option>
                                <option value={ItemType.Shield}>Shield</option>
                                <option value={ItemType.AdventuringSupply}>Adventuring Supply</option>
                                <option value={ItemType.Potion}>Potion</option>
                            </select>
                        </label>

                        <label>
                            Name
                            <input value={name} onChange={(e) => setName(e.target.value)} />
                        </label>

                        {itemType === ItemType.Weapon && (
                            <>
                                <label>
                                    Weapon Type
                                    <select value={weaponType} onChange={(e) => setWeaponType(e.target.value as WeaponType)}>
                                        <option value={WeaponType.Melee}>{WeaponType.Melee}</option>
                                        <option value={WeaponType.Ranged}>{WeaponType.Ranged}</option>
                                        <option value={WeaponType.Special}>{WeaponType.Special}</option>
                                    </select>
                                </label>

                                <label>
                                    Handedness
                                    <select value={handedness} onChange={(e) => setHandedness(e.target.value as WeaponHandedness)}>
                                        <option value={WeaponHandedness.OneHanded}>{WeaponHandedness.OneHanded}</option>
                                        <option value={WeaponHandedness.Versatile}>{WeaponHandedness.Versatile}</option>
                                        <option value={WeaponHandedness.TwoHanded}>{WeaponHandedness.TwoHanded}</option>
                                    </select>
                                </label>

                                <label>
                                    Style (single or comma-separated)
                                    <input value={style as string} onChange={(e) => setStyle(e.target.value as any)} />
                                </label>

                                <label>
                                    Damage
                                    <input value={damage} onChange={(e) => setDamage(e.target.value)} />
                                </label>

                                <label>
                                    Versatile Damage
                                    <input value={versatileDamage} onChange={(e) => setVersatileDamage(e.target.value)} />
                                </label>

                                <label>
                                    Properties (comma separated)
                                    <input value={properties} onChange={(e) => setProperties(e.target.value)} />
                                </label>

                                <label>
                                    Features / Description
                                    <textarea value={features} onChange={(e) => setFeatures(e.target.value)} />
                                </label>
                            </>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={handleSave} disabled={!itemType || !name} data-testid="save-custom-item">
                                Save
                            </button>
                        </div>
                    </div>
                </StyledFeaturePopupDescription>
            </StyledFeaturePopupContent>
        </StyledFeaturePopupOverlay>
    );
};

export default CustomItemModal;
