import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, ArrowLeft } from 'lucide-react-native';

export default function ProfileSettings() {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Social media manager and content creator passionate about building engaging communities.',
    website: 'https://johndoe.com',
    joinDate: 'January 2023'
  });

  const [isEditing, setIsEditing] = useState(false);

  function handleSave() {
    // In a real app, this would save to a backend
    setIsEditing(false);
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
  }

  function handleCancel() {
    setIsEditing(false);
    // Reset any unsaved changes here if needed
  }

  function updateField(field, value) {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  function renderField(label, value, field, icon, multiline = false) {
    return (
      <View style={styles.fieldContainer}>
        <View style={styles.fieldHeader}>
          {React.createElement(icon, { size: 20, color: '#64748B' })}
          <Text style={styles.fieldLabel}>{label}</Text>
        </View>
        {isEditing ? (
          <TextInput
            style={[styles.fieldInput, multiline && styles.multilineInput]}
            value={value}
            onChangeText={(text) => updateField(field, text)}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
        ) : (
          <Text style={styles.fieldValue}>{value}</Text>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Profile Settings',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity 
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
              style={styles.headerButton}
            >
              {isEditing ? (
                <Save size={20} color="#1DA1F2" />
              ) : (
                <Text style={styles.editButtonText}>Edit</Text>
              )}
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="#64748B" />
            </View>
            {isEditing && (
              <TouchableOpacity 
                style={styles.cameraButton}
                onPress={() => Alert.alert('Change Photo', 'Photo selection would be implemented here')}
              >
                <Camera size={16} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileEmail}>{profileData.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          {renderField('Full Name', profileData.name, 'name', User)}
          {renderField('Email', profileData.email, 'email', Mail)}
          {renderField('Phone', profileData.phone, 'phone', Phone)}
          {renderField('Location', profileData.location, 'location', MapPin)}
          {renderField('Bio', profileData.bio, 'bio', User, true)}
          {renderField('Website', profileData.website, 'website', User)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Calendar size={20} color="#64748B" />
              <Text style={styles.fieldLabel}>Member Since</Text>
            </View>
            <Text style={styles.fieldValue}>{profileData.joinDate}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>Posts Created</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45.2K</Text>
              <Text style={styles.statLabel}>Total Reach</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8%</Text>
              <Text style={styles.statLabel}>Avg Engagement</Text>
            </View>
          </View>
        </View>

        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.dangerZone}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={() => {
              Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account? This action cannot be undone.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive' }
                ]
              );
            }}
          >
            <Text style={styles.dangerButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerButton: {
    marginRight: 16,
  },
  editButtonText: {
    color: '#1DA1F2',
    fontSize: 16,
    fontWeight: '600',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#64748B',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#1E293B',
    lineHeight: 24,
  },
  fieldInput: {
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1DA1F2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#1DA1F2',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dangerZone: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dangerButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    textAlign: 'center',
  },
});