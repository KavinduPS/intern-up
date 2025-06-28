import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { generateRoadmap, RoadmapType } from '../../services/roadmapService';
import { roadmapSuggestions } from '../../services/roadmapSuggestions';
import { skillCategory } from '../../services/skillScoringConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoadmapScreen = () => {
  const { skillLevel } = useQuiz();
  const [roadmap, setRoadmap] = useState<RoadmapType[]>();

  useEffect(() => {
    console.log(skillLevel);
    const roadmap = generateRoadmap(skillLevel!, roadmapSuggestions);
    setRoadmap(roadmap);
    console.log(roadmap);
  }, []);

  const renderRoadmapItem = (item: RoadmapType, index: number) => {
    const isEven = index % 2 === 0;

    return (
      <View key={index} style={styles.roadmapItemContainer}>
        {/* Timeline Line */}
        <View style={styles.timelineContainer}>
          <View
            style={[
              styles.timelineNode,
              { backgroundColor: getNodeColor(index) },
            ]}
          >
            <Text style={styles.nodeNumber}>{index + 1}</Text>
          </View>
          {index < roadmap!.length - 1 && <View style={styles.timelineLine} />}
        </View>

        {/* Content Card */}
        <View
          style={[
            styles.contentCard,
            isEven ? styles.cardLeft : styles.cardRight,
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.categoryText}>
              {skillCategory[item.category as keyof typeof skillCategory]}
            </Text>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: getNodeColor(index) },
              ]}
            />
          </View>
          <Text style={styles.suggestionText}>{item.suggestions}</Text>
        </View>
      </View>
    );
  };

  const getNodeColor = (index: number) => {
    const colors = [
      '#6366F1',
      '#8B5CF6',
      '#EC4899',
      '#F59E0B',
      '#10B981',
      '#EF4444',
    ];
    return colors[index % colors.length];
  };

  if (!roadmap) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your roadmap...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Internship Readiness</Text>
          <Text style={styles.headerSubtitle}>
            Your personalized learning path
          </Text>
        </View>

        {/* Roadmap Items */}
        <View style={styles.roadmapContainer}>
          {roadmap.map((item, index) => renderRoadmapItem(item, index))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎯 Complete all steps to boost your internship readiness!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoadmapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  header: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  skillLevelBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skillLevelText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  roadmapContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  roadmapItemContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 16,
    zIndex: 1,
  },
  timelineNode: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nodeNumber: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timelineLine: {
    width: 3,
    height: 40,
    backgroundColor: '#E2E8F0',
    marginTop: 8,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  cardLeft: {
    marginLeft: 8,
  },
  cardRight: {
    marginRight: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
  },
  categoryBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  suggestionText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 16,
  },
  progressText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerText: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    fontWeight: '500',
  },
});
